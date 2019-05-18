/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Classes.Package;
import javax.json.JsonArray;

/**
 *
 * @author Robert
 */
@WebServlet(urlPatterns = {"/PackageServlet"})
public class PackageServlet extends HttpServlet {

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
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        out = response.getWriter();
        String action = request.getParameter("action");

        System.out.print(action);

        Package pack = new Package();
        switch (action) {
            case "create": {
                String name = request.getParameter("name");
                int resortId = Integer.parseInt(request.getParameter("resortId"));
                String details = request.getParameter("details");
                int price = Integer.parseInt(request.getParameter("price"));
                String from = request.getParameter("from");
                String to = request.getParameter("to");
                int guests = Integer.parseInt(request.getParameter("guests"));
//                String image = request.getParameter("image");

                if (pack.createPack(name, resortId, details, price, from, to, guests)) {
                    System.out.print("in the if");
                    response.setStatus(200);
                    out.print("package created");
                } else {
                    response.setStatus(401);
                    out.print("Error");
                }

                break;
            }
            case "readAll": {
                String category = request.getParameter("category");

                JsonArray result = pack.readAll(category);

                if (result == null) {
                    response.setStatus(404);
                } else {
                    response.setStatus(200);
                }
                out.print(result);

                break;
            }
            case "delete": {
                break;
            }
            case "readByResortID": {
                int id = Integer.parseInt(request.getParameter("id"));
                
                JsonArray result;
                result = pack.readByResortID(id);
                
                if (result == null) {
                    response.setStatus(404);
                } else {
                    response.setStatus(200);
                }
                out.print(result);
                
                break;
            }
            case "updatePackage": {
                int id = Integer.parseInt(request.getParameter("id"));
                String name = request.getParameter("name");
                String details = request.getParameter("details");
                int price = Integer.parseInt(request.getParameter("price"));
                String from = request.getParameter("from");
                String to = request.getParameter("to");
                int capacity = Integer.parseInt(request.getParameter("capacity"));
                
                System.out.println(id);
                System.out.println(name);
                System.out.println(details);
                System.out.println(price);
                System.out.println(from);
                System.out.println(to);
                System.out.println(capacity);
                if (pack.updatePack(id, name, details, price, from, to, capacity)) {
                    response.setStatus(200);
                    out.println("Package Modified Successfully");
                } else {
                    response.setStatus(401);
                }
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
