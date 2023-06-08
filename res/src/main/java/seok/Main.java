package seok;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
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

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("엔터키를 눌러 파일공유 서버를 작동시킵니다.");
        sc.nextLine();
        System.out.println("종료하려면 stop을 입력하세요.\n");

        try {
            ProcessBuilder builder = new ProcessBuilder("node", "server.js");
            builder.redirectErrorStream(true);
            process = builder.start();
            start = new Thread(new readTH());
            start.start();
        } catch (Exception e) {
            e.printStackTrace();
        }

        while (true) {
            String input = sc.nextLine().toLowerCase();
            if (input.equals("stop")) {
                process.destroy();
                break;
            }
        }
        sc.close();
    }
}

class readTH extends Main implements Runnable {
    @Override
    public void run() {
        try {
            URL url = new URL("http://checkip.amazonaws.com/");
            HttpURLConnection hur = (HttpURLConnection) url.openConnection();
            BufferedReader ipbr = new BufferedReader(new InputStreamReader(hur.getInputStream()));

            FileInputStream fis = new FileInputStream("./server.json");
            BufferedReader jsonbuffer = new BufferedReader(new InputStreamReader(fis));

            JSONObject jsonObject = new JSONObject(jsonbuffer.lines().collect(Collectors.joining("\n")));
            int port = jsonObject.getInt("port");
            String login;

            if (port == 80 || port == 443)
                login = ipbr.readLine();
            else
                login = ipbr.readLine() + ":" + port;

            System.out.println("공유 ip 주소: " + login);
            Desktop.getDesktop().browse(new URI("http://" + login));
            jsonbuffer.close();

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
