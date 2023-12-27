package com.servlets.image;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.databases.Image;

@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 40,
 maxFileSize = 1024 * 1024 * 80,
 maxRequestSize = 1024 * 1024 * 100)
 
public class SaveImage extends HttpServlet {

    private static final String USER_IMAGES_PATH = "assets/images/usersImages/";
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String serverHome = getServletContext().getRealPath("/");
            Connection c=(Connection)getServletContext().getAttribute("Connection");
            String location = serverHome + USER_IMAGES_PATH;
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("result", new Image().updatePhoto(c, request.getPart("userImage"), Integer.parseInt(request.getParameter("uid")), request.getParameter("imageType"), location));
            response.getWriter().println(jsonObject);   
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
