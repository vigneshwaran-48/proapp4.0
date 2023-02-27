package com.servlets.project;

import java.io.IOException;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.databases.project.*;

@MultipartConfig
public class RemoveProjectRelation extends HttpServlet{
    @Override
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException{
        try{
            Connection con = (Connection) request.getServletContext().getAttribute("Connection");
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(request.getParameter("userData"));
            int pid = Integer.parseInt((String) jsonObject.get("projectId"));
            Long uid = Long.parseLong(String.valueOf(jsonObject.get("userId")));
            JSONObject result = new JSONObject();
            if(new UpdateProject().deleteUserFromProject(uid,pid,con))
            {
                result.put("status", "success");
            }
            else
            {
                result.put("status", "unsuccess");
                
            }
            response.getWriter().print(result);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
