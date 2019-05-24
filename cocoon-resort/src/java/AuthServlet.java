/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Classes.Client;
import Classes.Email;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author user
 */
@WebServlet(urlPatterns = {"/AuthServlet"})
public class AuthServlet extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        PrintWriter out = response.getWriter();

        String action = request.getParameter("action");

        switch (action) {
            case "forgot": {
                String email = request.getParameter("email");
                Client client = new Client();
                if (client.exists(email)) {
                    Random rand = new Random();
                    int randomNumber = rand.nextInt(9000) + 1000;
                    Email emailObj = new Email();
                    emailObj.send("forgot", email, randomNumber, 0, 0);
                    response.setStatus(200);
                    out.print(randomNumber);
                } else {
                    response.setStatus(404);
                }
                break;
            }
            case "resetPassword": {
                String email = request.getParameter("email");
                String password = request.getParameter("password");
                Client client = new Client();

                if (client.resetPassword(email, password)) {
                    response.setStatus(200);
                } else {
                    response.setStatus(404);
                }
                break;
            }
            case "verifyClient": {
                String token = request.getParameter("token");

                Client client = new Client();
                if (client.verifyClient(token)) {
                    response.setStatus(200);
                    out.print("verified");
//                    client.login(token);
                } else {
                    response.setStatus(404);

                }
                break;
            }
            default:
                break;
        }
    }

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
