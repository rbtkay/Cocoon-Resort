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

    Lib lib = new Lib();
    Client client = new Client();

    public void send(String type, String customerEmail, int customer, int resort, int pack) {
        String host = "smtp.gmail.com";
        final String sender = "loyalty.cocoon";//change accordingly
        final String password = "Loyalty111Cocoon";//change accordingly

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
            String toAddress = "";
            String returnString = "";
            switch (type) {
                case "receipt": {
                    String[] mailInfo = lib.mailInfo(customer, resort, pack);
                    toAddress = mailInfo[0];
                    message.setSubject("Thank You for Reserving from " + mailInfo[1]);
                    returnString = "<h2>Below are your trip details for " + mailInfo[2] + "</h2><hr />";
                    returnString += "Reservation for " + mailInfo[7] + "<br />";
                    returnString += "Starting: " + mailInfo[5] + "<br />";
                    returnString += "Ending: " + mailInfo[6] + "<br />";
                    returnString += "Price: " + mailInfo[4] + "<br />";
                    returnString += "<h3>Package Description:</h3>";
                    returnString += mailInfo[3];
                    break;
                }
                case "forgot": {
                    message.setSubject("Password Reset");
                    toAddress = customerEmail;
                    returnString = "<h2>Password Resetted Successfully!</h2> <br />";
                    returnString += "Your password has been reset, if you did not make that request, reply to that email.";
                    returnString += "<h3>Your reset code is: " + customer + "</h3>";
                    break;
                }
                case "verify": {
                    message.setSubject("Welcome to Cocoon Resorts!");
                    toAddress = customerEmail;
                    returnString = "<h2>Thank You for Joining Us!</h2> <br />";
                    returnString += "In order to get on your reservation sprees you need to first verify it's actually you ;)<br />";
                    returnString += "<a href=...>CLICK ME!</a>";
                    break;
                }
                default:
                    break;
            }
            message.setContent(returnString, "text/html");
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(toAddress)
            );
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

    public String composeMessage(String type, int customer, int resort, int pack) {
        String returnString = "";
        switch (type) {
            case "receipt": {

            }
            case "forgot": {

            }
            default:
                break;
        }
        return returnString;
    }
}
