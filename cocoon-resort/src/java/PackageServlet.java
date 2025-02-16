/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Classes.Image;
import Classes.JWT;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Classes.Package;
import java.util.ArrayList;
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
//                String test = request.getParameter("from");
//                System.out.print(test);
//                System.out.print(request.getParameter("to"));
                String token = request.getParameter("token");
                String id = request.getParameter("resortId");

                System.out.print(token);
                System.out.print(id);
                if (this.verifyUser(token, id)) {

                    String name = request.getParameter("name");
                    int resortId = Integer.parseInt(request.getParameter("resortId"));
                    String details = request.getParameter("details");
                    int price = Integer.parseInt(request.getParameter("price"));
                    String from = String.valueOf(request.getParameter("from"));
                    String to = String.valueOf(request.getParameter("to"));
                    int capacity = Integer.parseInt(request.getParameter("capacity"));
//
//                System.out.print(name);
//                System.out.print(resortId);
//                System.out.print(details);
//                System.out.print(price);
//                System.out.print(from);
//                System.out.print(to);
//                System.out.print(capacity);
////                String image = request.getParameter("image");
//
                    if (pack.createPack(name, resortId, details, price, from, to, capacity)) {
                        System.out.print("in the if");
                        response.setStatus(200);
                        out.print("package created");
                    } else {
                        response.setStatus(403);
                        out.print("Error");
                    }
//                String kevin = "18-02-2019";
//                System.out.print(kevin);
                } else {
                    response.setStatus(401);
                    out.print("Auth Failed");
                }
                break;
            }
            case "filterByDate": {
                String start = request.getParameter("start");
                String end = request.getParameter("end");

                System.out.print("start");
                System.out.print(start);
                System.out.print("end");
                System.out.print(end);

                JsonArray result = pack.filterByDate(start, end);
                if (result == null) {
                    response.setStatus(404);
                } else {
                    response.setStatus(200);
                    out.print(result);
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
                String id = request.getParameter("id");
                int packId = Integer.parseInt(request.getParameter("packId"));
                String token = request.getParameter("token");

                if (this.verifyUser(token, id)) {
                    if (pack.delete(packId)) {
                        response.setStatus(200);
                        out.print("package deleted");
                    }
                } else {
                    response.setStatus(401);
                    out.print("Auth Failed");
                }
                break;
            }
            case "readByResortId": {
                JsonArray result;
                int resortId = Integer.parseInt(request.getParameter("id"));
                result = pack.readByResortID(resortId);

                if (result == null) {
                    response.setStatus(404);
                } else {
                    response.setStatus(200);
                }
                out.print(result);
                break;
            }
            case "updatePackage": {
                String id = request.getParameter("id");
                String token = request.getParameter("token");

                if (this.verifyUser(token, id)) {

                    int packId = Integer.parseInt(request.getParameter("packId"));
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
                    if (pack.updatePack(packId, name, details, price, from, to, capacity)) {
                        response.setStatus(200);
                        out.println("Package Modified Successfully");
                    } else {
                        response.setStatus(401);
                    }
                } else {
                    response.setStatus(401);
                    out.print("Auth Failed");
                }
                break;
            }
            case "readOne": {
                int id = Integer.parseInt(request.getParameter("id"));

                JsonArray result = pack.readOne(id);

                if (result == null) {
                    response.setStatus(404);
                } else {
                    response.setStatus(200);
                }
                out.print(result);
                break;
            }
            case "getImageNames": {
                int id = Integer.parseInt(request.getParameter("packageId"));

                ArrayList<String> imageNames = pack.getImageNames(id);
                if (imageNames == null) {
                    response.setStatus(404);
                } else {
                    response.setStatus(200);
                }
                out.print(imageNames);
                break;
            }
            case "getSingleImageName": {
                int id = Integer.parseInt(request.getParameter("packageId"));
                out.print(pack.getSingleImageName(id));
                break;
            }
            case "deleteImage": {
                String id = request.getParameter("id");
                String token = request.getParameter("token");
                int packageId = Integer.parseInt(request.getParameter("packageId"));
                String imageName = request.getParameter("imageName");
                if (this.verifyUser(token, id)) {
                    Image img = new Image();
                    if (img.deleteImage(packageId, imageName)) {
                        response.setStatus(200);
                    } else {
                        response.setStatus(404);
                    }
                } else {
                    response.setStatus(401);
                }
            }
        }
    }

    private boolean verifyUser(String token, String id) {

        JWT jwt = new JWT();

        String[] decoded = jwt.parseJWT(token);

        if (decoded[0].equals(id)) {
            return true;
        } else {
            return false;
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
