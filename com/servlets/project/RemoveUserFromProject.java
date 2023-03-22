package com.servlets.project;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.databases.project.UpdateProject;

@MultipartConfig
public class RemoveUserFromProject extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con = (Connection) getServletContext().getAttribute("Connection");
        try {
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("userData"));
            int pid = Integer.parseInt((String) jsonObject.get("projectId"));
            Long uid = Long.parseLong(String.valueOf(jsonObject.get("userId")));

            JSONObject result = new JSONObject();
            if(new UpdateProject().deleteUserFromProject(uid,pid,con)){
                result.put("status", "success");
            }
            else{
                result.put("status", "unsuccess");        
            }
            response.getWriter().print(result);
        } catch (ParseException e) {
            e.printStackTrace();
            response.getWriter().print(new JSONObject().put("result", "An Error Occured"));
        }
    }
}
