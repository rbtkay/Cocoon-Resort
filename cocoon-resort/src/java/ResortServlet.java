/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Classes.Resort;
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
import javax.servlet.http.HttpSession;

/**
 *
 * @author Robert
 */
@WebServlet(urlPatterns = {"/ResortServlet"})
public class ResortServlet extends HttpServlet {

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
        String action = request.getParameter("action");

        Resort resort = new Resort();
        switch (action) {
            case "create": {
                String name = request.getParameter("name");
                String password = request.getParameter("password");
                String location = request.getParameter("location");
                String category = request.getParameter("category");

                if (resort.create(name, password, location, category)) {
                    response.setStatus(201);
                    out.print("Resort Successfully Created");
                } else {
                    response.setStatus(401);
                    out.print("Connection Error");
                }
                break;
            }
            case "login": {
                String resortName = request.getParameter("resortName");
                String password = request.getParameter("password");

                System.out.print("here in the servlet");
                System.out.print(resortName);
                System.out.print(password);
                System.out.print(resort.login(resortName, password));

                JsonArray resultJson = resort.login(resortName, password);
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
            case "getLocations": {
                JsonArray resultJson = resort.getLocations();
                if (resultJson != null) {
                    response.setStatus(200);
                    out.print(resultJson);
                } else {
                    response.setStatus(404);
                    JsonArrayBuilder builder = Json.createArrayBuilder();
                    builder.add(Json.createObjectBuilder()
                            .add("message", "No Locations are Available"));
                    JsonArray error = builder.build();
                    out.print(error);
                }
                break;
            }
            case "readAll": {
                String category = request.getParameter("category");
                
                JsonArray result = resort.readAll(category);
                
                if (result == null) {
                    response.setStatus(404);
                } else {
                    response.setStatus(200);
                }
                out.print(result);
                
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
