import React from "react";
import "./StudentAttendanceTable.css";

const StudentMonthlyPresentSheetTableCollapse = ({ students }) => {
  return (
    <div className="studentAttendance">
      <table border="1">
        <thead>
          <tr>
            <th rowspan="3">Roll No.</th>
            <th rowspan="3">STUDENT NAME</th>

            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
            <th>21</th>
            <th>22</th>
            <th>23</th>
            <th>24</th>
            <th>25</th>
            <th>26</th>
            <th>27</th>
            <th>28</th>
            <th>29</th>
            <th>30</th>
            <th>31</th>
            <th>32</th>
            <th rowSpan="3">Present</th>
          </tr>
          <tr>
            <th>Sat</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
          </tr>
          <tr>
            <th>15-1</th>
            <th>16-1</th>
            <th>17-1</th>
            <th>18-1</th>
            <th>19-1</th>
            <th>20-1</th>
            <th>21-1</th>
            <th>22-1</th>
            <th>23-1</th>
            <th>24-1</th>
            <th>25-1</th>
            <th>26-1</th>
            <th>27-1</th>
            <th>28-1</th>
            <th>29-1</th>
            <th>30-1</th>
            <th>31-1</th>
            <th>1-2</th>
            <th>2-2</th>
            <th>3-2</th>
            <th>4-2</th>
            <th>5-2</th>
            <th>6-2</th>
            <th>7-2</th>
            <th>8-2</th>
            <th>9-2</th>
            <th>10-2</th>
            <th>11-2</th>
            <th>12-2</th>
            <th>13-2</th>
            <th>14-2</th>
            <th>15-2</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.dbModelLst.map((s) => {
              return (
                <tr key={s.$id}>
                  <td>{s.RollNumber}</td>
                  <td>{s.StudentFullName}</td>
                  <td>{s.C1 ? s.C1 : ""}</td>
                  <td>{s.C2 ? s.C2 : ""}</td>
                  <td>{s.C3 ? s.C3 : ""}</td>
                  <td>{s.C4 ? s.C4 : ""}</td>
                  <td>{s.C6 ? s.C6 : ""}</td>
                  <td>{s.C5 ? s.C5 : ""}</td>
                  <td>{s.C7 ? s.C7 : ""}</td>
                  <td>{s.C8 ? s.C8 : ""}</td>
                  <td>{s.C9 ? s.C9 : ""}</td>
                  <td>{s.C10 ? s.C10 : ""}</td>
                  <td>{s.C11 ? s.C11 : ""}</td>
                  <td>{s.C12 ? s.C12 : ""}</td>
                  <td>{s.C13 ? s.C13 : ""}</td>
                  <td>{s.C14 ? s.C14 : ""}</td>
                  <td>{s.C15 ? s.C15 : ""}</td>
                  <td>{s.C16 ? s.C16 : ""}</td>
                  <td>{s.C17 ? s.C17 : ""}</td>
                  <td>{s.C18 ? s.C18 : ""}</td>
                  <td>{s.C19 ? s.C19 : ""}</td>
                  <td>{s.C20 ? s.C20 : ""}</td>
                  <td>{s.C21 ? s.C21 : ""}</td>
                  <td>{s.C22 ? s.C22 : ""}</td>
                  <td>{s.C23 ? s.C23 : ""}</td>
                  <td>{s.C24 ? s.C24 : ""}</td>
                  <td>{s.C25 ? s.C25 : ""}</td>
                  <td>{s.C26 ? s.C26 : ""}</td>
                  <td>{s.C27 ? s.C27 : ""}</td>
                  <td>{s.C28 ? s.C28 : ""}</td>
                  <td>{s.C29 ? s.C29 : ""}</td>
                  <td>{s.C30 ? s.C30 : ""}</td>
                  <td>{s.C31 ? s.C31 : ""}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentMonthlyPresentSheetTableCollapse;
