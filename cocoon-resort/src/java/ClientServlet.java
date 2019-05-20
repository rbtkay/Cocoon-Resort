/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Classes.Email;
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
import javax.servlet.http.HttpSession;

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
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        out = response.getWriter();

        Client client = new Client();
        System.out.print("in the servlet");

        String action = request.getParameter("action");

        switch (action) {
            case "create": {
                String name = request.getParameter("name");
                String password = request.getParameter("password");
                int phone = Integer.parseInt(request.getParameter("phone"));
                String email = request.getParameter("email");

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

                System.out.println("email" + email);
                System.out.println("password" + password);

                JsonArray resultJson = client.login(email, password);

                if (resultJson != null) {
                    response.setStatus(200);
                    out.print(resultJson);
                } else {
                    response.setStatus(404);
                    JsonArrayBuilder builder = Json.createArrayBuilder();
                    builder.add(Json.createObjectBuilder()
                            .add("message", "Wrong Username or Password"));
                    JsonArray error = builder.build();
                    out.print(error);
                }
                break;
            }
            case "logout": {
                break;
            }
            case "delete": {
                String email = request.getParameter("email");
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
//
//    public JsonArray toJSON(String s) {
//        JsonArrayBuilder builder = Json.createArrayBuilder();
//
//        builder.add(Json.createObjectBuilder()
//                .add("message", "hello, " + id));
//
//        builder.add(Json.createObjectBuilder().add("name", "kevin"));
//        JsonArray test = builder.build();
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
