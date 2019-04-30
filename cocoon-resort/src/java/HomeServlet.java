/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

/**
 *
 * @author Robert
 */
@WebServlet(urlPatterns = {"/HomeServlet"})
public class HomeServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
//            out.println("<!DOCTYPE html>");
//            out.println("<html>");
//            out.println("<head>");
//            out.println("<title>Servlet HomeServlet</title>");
//            out.println("</head>");
//            out.println("<body>");
//            out.println("<h1>Servlet HomeServlet at " + request.getContextPath() + "</h1>");
//            out.println("</body>");
//            out.println("</html>");

            String host = "smtp.gmail.com";
            final String user = "loyalty.cocoon";//change accordingly  
            final String password = "Loyalty11Cocoon";//change accordingly  

            String to = "kevin.boghossian@gmail.com";//change accordingly  

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
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true"); //TLS

            Session session = Session.getInstance(props,
                    new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(user, password);
                }
            });

            //Compose the message  
            try {
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(user));
                message.setRecipients(
                        Message.RecipientType.TO,
                        InternetAddress.parse(to)
                );
                message.setSubject("javatpoint");
                message.setText("This is simple program of sending email using JavaMail API");

                //send the message  
//                Transport transport = session.getTransport("smtp");
//                transport.connect(host, user, password);
                Transport.send(message);

//                transport.close();
                System.out.println("message sent successfully...");

            } catch (MessagingException e) {
                e.printStackTrace();
            }
//////////////////////////////////////////////////////
//            JsonArrayBuilder builder = Json.createArrayBuilder();
//
//            builder.add(Json.createObjectBuilder()
//                    .add("type", "hello")
//                    .add("second", "world")
//                    .add("third", "world")
//                    .add("fourth", "world"));
//
//            builder.add(Json.createObjectBuilder().add("name", "kevin"));
//
//            JsonArray test = builder.build();
//
////            System.out.println(test);
//            out.print(test);
//            out.print()
        }

//        this.numbers();
    }

//    public JsonArray numbers() {
//        JsonArrayBuilder array = Json.createArrayBuilder();
//        
//        Json test = 
//
//        return array.build();
//    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
