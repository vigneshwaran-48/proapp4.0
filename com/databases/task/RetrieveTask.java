package com.databases.task;

import java.sql.*;
import java.util.ArrayList;

import org.json.simple.*;

import com.databases.users.RetrieveUser;

/**
 * This class is used to retrieve tasks data
 */
public class RetrieveTask {
    /**
     * This method is used get status of the task
     * @param con This is used connect to the DB
     * @param tid This is used to get status of that particular task.
     * @return returns a int represents the percentage.
     */
    private int taskStatus(Connection con, int tid) {
        int status = 0;
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select IsCompleted from task_relation where tid=" + tid);
            int trueCount = 0;
            int totalCount = 0;
            while (rs.next()) {
                if (rs.getString("IsCompleted").equals("true")) {
                    trueCount++;
                }
                totalCount++;
            }
            if (totalCount != 0) {
                status = (trueCount * 100) / totalCount;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    /**
     * This method is used to retrieve tasks.
     * @param con This is used connect to the DB
     * @param uid This is used to get the tasks of the particular user.
     * @return returns a JSONArray contains all tasks of the given user
     */
    public JSONArray retrieveTask(Connection con, int uid) {
        JSONArray jsonArray = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from task_relation inner join tasks on task_relation.tid = tasks.tid where task_relation.uid ="+uid);
            RetrieveUser uallTask = new RetrieveUser();

            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("tname", rs.getString("tname"));
                jsonObject.put("tid", rs.getInt("tid"));
                jsonObject.put("users", uallTask.getUserDetailByTid(con, rs.getInt("tid")));
                jsonObject.put("status",rs.getString("status"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("toDate", rs.getString("todate"));
                jsonObject.put("createdBy", rs.getInt("created_by"));
                jsonObject.put("projectId",rs.getInt("pid"));
                jsonObject.put("description", rs.getString("description"));
                jsonObject.put("percentage", taskStatus(con,rs.getInt("tid")));
                jsonObject.put("isCompleted", isCompleted(con, uid,rs.getInt("tid")));
                jsonArray.add(jsonObject);
            }
            // System.out.println(jsonArray);
        } 
        catch (SQLException e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

    /**
     * This is a helper method for retrieveTask() method
     * @param con Used to connect to Db
     * @param uid Used to get the task of given user id 
     * @param tid Used to get the given Task
     * @return returns boolean on basis  
     */
    public boolean isCompleted(Connection con,int uid,int tid) {
        boolean result=false;
        try {
            Statement stmt=con.createStatement();
            ResultSet rs=stmt.executeQuery("select IsCompleted from task_relation where tid="+tid+" and uid="+uid);
            rs.next();
            if(rs.getString("IsCompleted").equals("true")){
                result=true;
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        return result;
    }

    public ArrayList<Integer> retreiveTidByUid(Connection con, int uid,int pid) {
        ArrayList<Integer> tids = new ArrayList<>();

        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select task_relation.tid from task_relation inner join tasks on task_relation.tid=tasks.tid where uid = "+uid+" and pid = "+pid); 
            while(rs.next()){
                tids.add(rs.getInt("tid"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return tids;
    }


   

    public JSONArray retreiveTasksByPid(Connection con, int pid, int uid) {
        JSONArray array = new JSONArray();
        try {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select tasks.tid, tname, fromdate, todate, status, description, created_by, IsCompleted from tasks inner join task_relation on tasks.tid = task_relation.tid  where uid = "+uid+" and pid = "+pid);
            RetrieveUser ru = new RetrieveUser();
            while (rs.next()) {
                JSONObject jsonObject = new JSONObject();
                int tid = rs.getInt("tid");
                jsonObject.put("taskId", tid);
                jsonObject.put("taskName", rs.getString("tname"));
                jsonObject.put("fromDate", rs.getString("fromdate"));
                jsonObject.put("todate", rs.getString("todate"));
                jsonObject.put("status", rs.getString("status"));
                jsonObject.put("description", rs.getString("description"));
                jsonObject.put("createdBy", rs.getString("created_by"));
                jsonObject.put("isCompleted", Boolean.parseBoolean(String.valueOf(rs.getString("IsCompleted"))));
                jsonObject.put("users", ru.getUserDetailByTid(con, tid));
                array.add(jsonObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return array;
    } 
    private boolean isCompletedGet(Connection c,int uid,int tid)
    {
        boolean result=false;
        try {
            Statement stmt=c.createStatement();
            ResultSet rs=stmt.executeQuery("select IsCompleted from task_relation where uid="+uid+" && tid= "+tid);
            rs.next();
            System.out.println("userid:"+uid);
            String val=rs.getString("IsCompleted");
            System.out.println("result:"+val);
            result=Boolean.valueOf(val);
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return result;
    }
}
