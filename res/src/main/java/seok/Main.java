package seok;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URI;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.awt.Desktop;

import org.json.JSONObject;

public class Main {
    static Process process;
    static Thread start;
    static String outIpAddr;
    static String inIpAddr;
    static String domain;
    static int port;
    static Scanner sc;

    public static void main(String[] args) {
        sc = new Scanner(System.in);
        System.out.print("엔터키를 눌러 파일공유 서버를 작동시킵니다.");
        sc.nextLine();
        System.out.println("종료하려면 stop을 입력하세요.\n");

        try {
            new Main().start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void start() throws Exception {
        ProcessBuilder builder = new ProcessBuilder("node", "server.js");
        builder.redirectErrorStream(true);
        process = builder.start();
        start = new Thread(new readTH());
        start.start();

        while (true) {
            String input = sc.nextLine().toLowerCase();
            if (input.equals("stop") || input.equals("exit")) {
                process.destroy();
                break;
            } else if (input.equals("info")) {
                ipAddr();
                continue;
            } else if (input.equals("web") && outIpAddr != null && domain != null) {
                if (domain.equals("")) {
                    Desktop.getDesktop().browse(new URI("http://" + outIpAddr));
                } else {
                    Desktop.getDesktop().browse(new URI("http://" + domain));
                }
                continue;
            } else if (input.equals("help")) {
                System.out.println("stop|exit:  서버를 종료 시킵니다..");
                System.out.println("info:   서버의 정보를 불러옵니다.");
                System.out.println("web:    브라우저를 엽니다.");
            }
        }
        sc.close();
    }

    public synchronized void ipAddr() throws Exception {
        if (outIpAddr != null) {
            System.out.println("내부 ip주소: " + inIpAddr);
            System.out.println("외부 ip주소: " + outIpAddr);
            if (!domain.equals("")) {
                System.out.println("연결된 도메인: " + domain);
            }
            System.out.println("포트번호: " + port);
            return;
        }
        URL url = new URL("http://checkip.amazonaws.com/");
        HttpURLConnection hur = (HttpURLConnection) url.openConnection();
        BufferedReader ipbr = new BufferedReader(new InputStreamReader(hur.getInputStream()));

        InetAddress ipAddress = InetAddress.getLocalHost();

        FileInputStream fis = new FileInputStream("./server.json");
        BufferedReader jsonbuffer = new BufferedReader(new InputStreamReader(fis));

        JSONObject jsonObject = new JSONObject(jsonbuffer.lines().collect(Collectors.joining("\n")));
        port = jsonObject.getInt("port");
        domain = jsonObject.getString("domain");

        if (port == 80 || port == 443) {
            outIpAddr = ipbr.readLine();
            inIpAddr = ipAddress.getHostAddress();
        } else {
            outIpAddr = ipbr.readLine() + ":" + port;
            inIpAddr = ipAddress.getHostAddress();
        }

        System.out.println("내부 ip주소: " + inIpAddr);
        System.out.println("외부 ip주소: " + outIpAddr);
        if (domain.equals("")) {
            Desktop.getDesktop().browse(new URI("http://" + outIpAddr));
        } else {
            System.out.println("연결된 도메인: " + domain);
            Desktop.getDesktop().browse(new URI("http://" + domain));
        }
        jsonbuffer.close();
    }
}

class readTH extends Main implements Runnable {
    @Override
    public void run() {
        try {
            ipAddr();

            BufferedReader br = new BufferedReader(process.inputReader(Charset.forName("utf-8")));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
