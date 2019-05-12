/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Classes.Client;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Robert
 */
@WebServlet(urlPatterns = {"/ClientServlet"})
public class ClientServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    PrintWriter out;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        out = response.getWriter();

        String action = request.getParameter("action");

        switch (action) {
            case "create": {
                String name = request.getParameter("name");
                String password = request.getParameter("password");
                int phone = Integer.parseInt(request.getParameter("phone"));
                String email = request.getParameter("email");

                Client client = new Client();

                if (client.create(name, password, phone, email)) {
                    response.setStatus(201);
                    out.print("Client Successfully Created");
                } else {
                    response.setStatus(401);
                    out.print("Connection Error");
                }
                break;
            }
            case "login": {
                String email = request.getParameter("email");
                String password = request.getParameter("password");

                Client client = new Client();

                if (client.login(email, password)) {
                    response.setStatus(200);
                    out.print("Successfully Logged in");
                } else {
                    response.setStatus(404);
                    out.print("Auth Failed");
                }
                break;
            }
            case "logout": {
                break;
            }
            case "delete": {
                String email = request.getParameter("email");

                Client client = new Client();

                if (client.delete(email)) {
                    out.print("Successfully Deleted");
                } else {
                    out.print("Failed to Delete Account");
                }
                break;
            }
            default: {
                break;
            }
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
