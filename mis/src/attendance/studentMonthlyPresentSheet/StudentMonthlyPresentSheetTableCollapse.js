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
                  <td
                    style={{
                      backgroundColor:
                        s.C1 == "A"
                          ? "grey"
                          : s.C1 == "P"
                          ? "green"
                          : s.C1 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C1 ? s.C1 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C2 == "A"
                          ? "grey"
                          : s.C2 == "P"
                          ? "green"
                          : s.C2 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C2 ? s.C2 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C3 == "A"
                          ? "grey"
                          : s.C3 == "P"
                          ? "green"
                          : s.C3 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C3 ? s.C3 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C4 == "A"
                          ? "grey"
                          : s.C4 == "P"
                          ? "green"
                          : s.C4 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C4 ? s.C4 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C5 == "A"
                          ? "grey"
                          : s.C5 == "P"
                          ? "green"
                          : s.C5 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C5 ? s.C5 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C6 == "A"
                          ? "grey"
                          : s.C6 == "P"
                          ? "green"
                          : s.C6 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C6 ? s.C6 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C7 == "A"
                          ? "grey"
                          : s.C7 == "P"
                          ? "green"
                          : s.C7 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C7 ? s.C7 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C8 == "A"
                          ? "grey"
                          : s.C8 == "P"
                          ? "green"
                          : s.C8 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C8 ? s.C8 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C9 == "A"
                          ? "grey"
                          : s.C9 == "P"
                          ? "green"
                          : s.C9 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C9 ? s.C9 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C10 == "A"
                          ? "grey"
                          : s.C10 == "P"
                          ? "green"
                          : s.C10 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C10 ? s.C10 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C11 == "A"
                          ? "grey"
                          : s.C11 == "P"
                          ? "green"
                          : s.C11 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C11 ? s.C11 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C12 == "A"
                          ? "grey"
                          : s.C12 == "P"
                          ? "green"
                          : s.C12 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C12 ? s.C12 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C13 == "A"
                          ? "grey"
                          : s.C13 == "P"
                          ? "green"
                          : s.C13 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C13 ? s.C13 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C14 == "A"
                          ? "grey"
                          : s.C14 == "P"
                          ? "green"
                          : s.C14 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C14 ? s.C14 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C15 == "A"
                          ? "grey"
                          : s.C15 == "P"
                          ? "green"
                          : s.C15 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C15 ? s.C15 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C16 == "A"
                          ? "grey"
                          : s.C16 == "P"
                          ? "green"
                          : s.C16 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C16 ? s.C16 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C17 == "A"
                          ? "grey"
                          : s.C17 == "P"
                          ? "green"
                          : s.C17 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C17 ? s.C17 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C18 == "A"
                          ? "grey"
                          : s.C18 == "P"
                          ? "green"
                          : s.C18 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C18 ? s.C18 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C19 == "A"
                          ? "grey"
                          : s.C19 == "P"
                          ? "green"
                          : s.C19 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C19 ? s.C19 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C20 == "A"
                          ? "grey"
                          : s.C20 == "P"
                          ? "green"
                          : s.C20 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C20 ? s.C20 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C21 == "A"
                          ? "grey"
                          : s.C21 == "P"
                          ? "green"
                          : s.C21 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C21 ? s.C21 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C22 == "A"
                          ? "grey"
                          : s.C22 == "P"
                          ? "green"
                          : s.C22 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C22 ? s.C22 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C23 == "A"
                          ? "grey"
                          : s.C23 == "P"
                          ? "green"
                          : s.C23 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C23 ? s.C23 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C24 == "A"
                          ? "grey"
                          : s.C24 == "P"
                          ? "green"
                          : s.C24 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C24 ? s.C24 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C25 == "A"
                          ? "grey"
                          : s.C25 == "P"
                          ? "green"
                          : s.C25 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C25 ? s.C25 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C26 == "A"
                          ? "grey"
                          : s.C26 == "P"
                          ? "green"
                          : s.C26 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C26 ? s.C26 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C27 == "A"
                          ? "grey"
                          : s.C27 == "P"
                          ? "green"
                          : s.C27 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C27 ? s.C27 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C28 == "A"
                          ? "grey"
                          : s.C28 == "P"
                          ? "green"
                          : s.C28 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C28 ? s.C28 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C29 == "A"
                          ? "grey"
                          : s.C29 == "P"
                          ? "green"
                          : s.C29 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C29 ? s.C29 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C30 == "A"
                          ? "grey"
                          : s.C30 == "P"
                          ? "green"
                          : s.C30 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C30 ? s.C30 : ""}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        s.C31 == "A"
                          ? "grey"
                          : s.C31 == "P"
                          ? "green"
                          : s.C31 == "H"
                          ? "red"
                          : "white",
                    }}
                  >
                    {s.C31 ? s.C31 : ""}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentMonthlyPresentSheetTableCollapse;
