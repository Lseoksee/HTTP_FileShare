package seok;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Scanner;

public class Main {
    static Process process;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("엔터키를 눌러 파일공유 서버를 작동시킵니다.");
        sc.nextLine();
        System.out.println("종료하려면 stop을 입력하세요.\n");

        try {
            ProcessBuilder builder = new ProcessBuilder("node", "server.js");
            builder.redirectErrorStream(true);
            process = builder.start();
            new Thread(new readTH()).start();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (sc.nextLine().equals("stop")) {
            process.destroy();
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
            System.out.println("공유 ip 주소: " + ipbr.readLine());

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
