/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Classes.Reservation;
import java.io.IOException;
import java.io.PrintWriter;
import javax.json.JsonArray;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Robert
 */
@WebServlet(urlPatterns = {"/ReservationServlet"})
public class ReservationServlet extends HttpServlet {

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

        Reservation reservation = new Reservation();

        switch (action) {
            case "create": {

                int packId = Integer.parseInt(request.getParameter("packId"));
                int clientId = Integer.parseInt(request.getParameter("clientId"));
                int resortId = Integer.parseInt(request.getParameter("resortId"));
                int quantity = Integer.parseInt(request.getParameter("quantity"));
                
                System.out.print(packId);
                System.out.print(clientId);
                System.out.print(resortId);
                System.out.print(quantity);

                if (reservation.create(packId, clientId, resortId, quantity)) {
                    response.setStatus(200);
                    out.print("Reservation Done");
                } else {
                    response.setStatus(401);
                    out.print("Error");
                }
                break;
            }
            case "readAll": {
//                String category = request.getParameter("category");

                JsonArray result = reservation.readAll();

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
