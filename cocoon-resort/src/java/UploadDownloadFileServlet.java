
import Classes.Image;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

@WebServlet("/UploadDownloadFileServlet")
public class UploadDownloadFileServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private ServletFileUpload uploader = null;
    Image img = new Image();

    @Override
    public void init() throws ServletException {
        DiskFileItemFactory fileFactory = new DiskFileItemFactory();
        File filesDir = (File) getServletContext().getAttribute("FILES_DIR_FILE");
        fileFactory.setRepository(filesDir);
        this.uploader = new ServletFileUpload(fileFactory);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        System.out.println("GETTING");
        String fileName = request.getParameter("imageName");
//        int packId = Integer.parseInt(request.getParameter("packageId"));
//        PrintWriter out = response.getWriter();''
//        ArrayList<String> images = img.getImages(packId);
//        if (images == null) {
//            response.setStatus(404);
//            return;
//        } else {
//            for (String fileName : images) {

        System.out.println("THE IMAGE IN SERVLET " + fileName);
        if (fileName == null || fileName.equals("")) {
            throw new ServletException("File Name can't be null or empty");
        }
        File file = new File(request.getServletContext().getAttribute("FILES_DIR") + File.separator + fileName);
        if (!file.exists()) {
            throw new ServletException("File doesn't exists on server.");
        }
        System.out.println("File location on server::" + file.getAbsolutePath());
        ServletContext ctx = getServletContext();
        InputStream fis = new FileInputStream(file);
        String mimeType = ctx.getMimeType(file.getAbsolutePath());

        System.out.println("MIME TYPE=====" + mimeType);
        System.out.println("CTX==============" + ctx);
//        response.setContentType("application/json");
        response.setContentType(mimeType != null ? mimeType : "application/octet-stream");
        response.setHeader("Content-Disposition", "image; filename=\"" + fileName + "\"");
//            response.setContentType("application/octet-stream");
        response.setContentLength((int) file.length());
//            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

        ServletOutputStream os = response.getOutputStream();
        byte[] bufferData = new byte[1024];
        int read = 0;
        while ((read = fis.read(bufferData)) != -1) {
////            System.out.print("in the while");
            os.write(bufferData, 0, read);
        }

//        os.write("<a href=\"UploadDownloadFileServlet?fileName=" + file.getName() + "\">Download " + file.getName() + "</a>");
        os.flush();
        os.close();
        fis.close();
        System.out.println("File downloaded at client successfully");
//        }
//        String fileName = request.getParameter("fileName");
//            }

//            String fileName = images.get(0);
//        for (String image : images) {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        if (!ServletFileUpload.isMultipartContent(request)) {
            throw new ServletException("Content type is not multipart/form-data");
        }
        System.out.println("POSTING");
        int packId = Integer.parseInt(request.getParameter("packageId"));

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
//        out.write("<html><head></head><body>");
        try {
            List<FileItem> fileItemsList = uploader.parseRequest(request);
            Iterator<FileItem> fileItemsIterator = fileItemsList.iterator();
            while (fileItemsIterator.hasNext()) {
                FileItem fileItem = fileItemsIterator.next();
                System.out.println("FieldName=" + fileItem.getFieldName());
                System.out.println("FileName=" + fileItem.getName());
                System.out.println("ContentType=" + fileItem.getContentType());
                System.out.println("Size in bytes=" + fileItem.getSize());

                File file = new File(request.getServletContext().getAttribute("FILES_DIR") + File.separator + fileItem.getName());
                if (img.insertImage(packId, fileItem.getName(), file.getAbsolutePath())) {
                    System.out.println("File inserted into table successfully");
                } else {
                    System.out.println("Failed to insert image into table");
                }
                System.out.println("Absolute Path at server=" + file.getAbsolutePath());
                fileItem.write(file);
                System.out.println("File " + fileItem.getName() + " uploaded successfully.");
//                System.out.println("<br>");
//                out.println("<a href=\"UploadDownloadFileServlet?fileName=" + fileItem.getName() + "\">Download " + fileItem.getName() + "</a>");
            }
        } catch (FileUploadException e) {
            System.out.println("Exception in uploading file." + e);
        } catch (Exception e) {
            System.out.println("Exception in uploading file." + e);
        }
//        out.write("</body></html>");
    }

}
