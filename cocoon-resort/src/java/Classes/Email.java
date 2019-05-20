package Classes;

import Classes.Lib;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Robert
 */
public class Email {
    public void send(String type, int customer, int resort, int pack) {
        String host = "smtp.gmail.com";
        final String sender = "loyalty.cocoon";//change accordingly
        final String password = "Loyalty111Cocoon";//change accordingly
        
        Lib lib = new Lib();
        String[] mailInfo = lib.mailInfo(customer, resort, pack);

//        String to = "caroline.bergqvist11@gmail.com";//change accordingly  
        //Get the session object  
//            Properties props = new Properties();
//            props.put("mail.smtp.starttls.enable", "true");
////            props.put("mail.smtp.host", host);
////            props.put("mail.smtp.user", user);
////            props.put("mail.smtp.password", password);
////            props.put("mail.smtp.socketFactory.port", "465");
////            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//            props.put("mail.smtp.auth", "true");
//            props.put("mail.smtp.port", "587");
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true"); //TLS

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }
        });

        //Compose the message
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(sender));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(mailInfo[0])
            );
            
            switch (type) {
                case "receipt": {
                    message.setSubject("Thank You for Reserving from " + mailInfo[1]);
                    String textToSend = "<h2>Below are your trip details for " + mailInfo[2] + "</h2><hr />";
                    textToSend += "Reservation for " + mailInfo[7] + "<br />";
                    textToSend += "Starting: " + mailInfo[5] + "<br />";
                    textToSend += "Ending: " + mailInfo[6] + "<br />";
                    textToSend += "Price: " + mailInfo[4] + "<br />";
                    textToSend += "<h3>Package Description:</h3>";
                    textToSend += mailInfo[3];
                    message.setContent(textToSend, "text/html");
                    
                    break;
                }
                default:
                    break;
            }
//            message.setText("Below are your reservation info from " + mailInfo[1]);

            //send the message  
//            Transport transport = session.getTransport("smtp");
//            transport.connect(host, user, password);
            Transport.send(message);

//                transport.close();
            System.out.println("message sent successfully...");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
