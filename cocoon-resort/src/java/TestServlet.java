///*
//* To change this license header, choose License Headers in Project Properties.
//* To change this template file, choose Tools | Templates
//* and open the template in the editor.
//*/
//
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.Collection;
//import java.util.Iterator;
//import java.util.List;
//import javax.servlet.ServletContext;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.MultipartConfig;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.Part;
////import org.apache.commons.fileupload.FileItem;
////import org.apache.commons.fileupload.FileUploadException;
////import org.apache.commons.fileupload.disk.DiskFileItemFactory;
////import org.apache.commons.fileupload.servlet.ServletFileUpload;
//
///**
//*
//* @author user
//*/
//@WebServlet(urlPatterns = {"/TestServlet"})
//@MultipartConfig
//public class TestServlet extends HttpServlet {
//
//   /**
//    * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
//    * methods.
//    *
//    * @param request servlet request
//    * @param response servlet response
//    * @throws ServletException if a servlet-specific error occurs
//    * @throws IOException if an I/O error occurs
//    * @throws org.apache.commons.fileupload.FileUploadException
//    */
//   protected void processRequest(HttpServletRequest request, HttpServletResponse response)
//           throws ServletException, IOException {
//       response.setContentType("text/html;charset=UTF-8");
//       response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//       response.setHeader("Access-Control-Allow-Methods", "POST");
//
//       try {
//
////           boolean isMultipart = ServletFileUpload.isMultipartContent(request);
////
////           DiskFileItemFactory factory = new DiskFileItemFactory();
////
////// Configure a repository (to ensure a secure temp location is used)
////           ServletContext servletContext = this.getServletConfig().getServletContext();
////           File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
////           factory.setRepository(repository);
////
////// Create a new file upload handler
////           ServletFileUpload upload = new ServletFileUpload(factory);
////
////// Parse the request
////           List<FileItem> items = upload.parseRequest(request);
////           System.out.print("size" + items.size());
////
//////            Iterator<FileItem> iter = items.iterator();
//       } catch (Exception ex) {
//           System.out.println(ex);
//       }
////        while (iter.hasNext()) {
////            FileItem item = iter.next();
////
////            if (item.isFormField()) {
////                processFormField(item);
////            } else {
////                process
////            }
////        }
//
//
////        java.util.Map<java.lang.String, java.lang.String[]> ParameterMap = request.getParameterMap();
////        Collection<Part> parts = request.getParts();
////        System.out.println("alo?" + ParameterMap);
////        request.get
////        System.out.println("part" + part);
////        File file = new File(request.getParameter("image"));
////        StringBuilder buffer = new StringBuilder();
////        BufferedReader reader = request.getReader();
////        String line;
////        while ((line = reader.readLine()) != null) {
////            buffer.append(line);
////        }
////        System.out.print(buffer.toString());
////        System.out.print(request.getReader());
////        System.out.print(reader.read());
////        int data = reader.read();
////
////        while (data != -1) {
////            char dataChar = (char) data;
////            data = reader.read();
////            System.out.print(data);
////        }
////        System.out.print("reader");
//   }
//
//   // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
//   /**
//    * Handles the HTTP <code>GET</code> method.
//    *
//    * @param request servlet request
//    * @param response servlet response
//    * @throws ServletException if a servlet-specific error occurs
//    * @throws IOException if an I/O error occurs
//    */
//   @Override
//   protected void doGet(HttpServletRequest request, HttpServletResponse response)
//           throws ServletException, IOException {
//       processRequest(request, response);
//   }
//
//   /**
//    * Handles the HTTP <code>POST</code> method.
//    *
//    * @param request servlet request
//    * @param response servlet response
//    * @throws ServletException if a servlet-specific error occurs
//    * @throws IOException if an I/O error occurs
//    */
//   @Override
//   protected void doPost(HttpServletRequest request, HttpServletResponse response)
//           throws ServletException, IOException {
//       processRequest(request, response);
//   }
//
//   /**
//    * Returns a short description of the servlet.
//    *
//    * @return a String containing servlet description
//    */
//   @Override
//   public String getServletInfo() {
//       return "Short description";
//   }// </editor-fold>
//
//}
