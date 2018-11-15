'use Script';
$(document).ready(function(){
    var today = new Date(); //내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
    var date = new Date();  //today의 Date를 세어주는 역할
    //    console.log(today);

    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    
    if(dd < 10){dd = '0' + dd}
    if(mm < 10){mm = '0' + mm}
    today01 = yyyy + ' / ' + mm + ' / ' + dd
    
    $('#clock').html(today01);
    
    function prevCalendar() {   //이전 달
        today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        buildCalendar(); //달력 cell 만들어 출력 
    }

    function nextCalendar() {//다음 달
        today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        buildCalendar();//달력 cell 만들어 출력
    }
    function buildCalendar(){//현재 달 달력 만들기
        var nMonth = new Date(today.getFullYear(),today.getMonth(),1);
        var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
        var tbCalendar = document.getElementById("calendar");
        var tbCalendarYM = document.getElementById("tbCalendarYM");
        tbCalendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; 
        
        /*while은 이번달이 끝나면 다음달로 넘겨주는 역할*/
        while (tbCalendar.rows.length > 2) {
            tbCalendar.deleteRow(tbCalendar.rows.length-1);
        }
        var row = null;
        row = tbCalendar.insertRow();
        var cnt = 0;// count, 셀의 갯수를 세어주는 역할
        for (i = 0; i < nMonth.getDay(); i++) { // 이번달의 day만큼 돌림
            cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
            cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
        }
        /*달력 출력*/
         for (i=1; i<=lastDate.getDate(); i++) { 
         //1일부터 마지막 일까지 돌림
              cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
              cell.innerHTML = i;//셀을 1부터 마지막 day까지 HTML 문법에 넣어줌
              cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
          if (cnt % 7 == 1) { // 일요일 계산 일주일을 7로 나눴을때 나머지가 1이면 cnt가 1번째에 위치함을 의미한다
            cell.innerHTML = "<font color=#fc4646>" + i
            //1번째의 cell에만 색칠
        }    
          if (cnt%7 == 0){ // 1주일이 7일 이므로 토요일 구하기 //월화수목금토일을 7로 나눴을때 나머지가 0이면 cnt가 7번째에 위치함을 의미한다
              cell.innerHTML = "<font color=#4d5bff>" + i
              //7번째의 cell에만 색칠
               row = calendar.insertRow();
               //토요일 다음에 올 셀을 추가
          }
          // 오늘의 날짜에 색칠하기
          if (today.getFullYear() == date.getFullYear()
             && today.getMonth() == date.getMonth()
             && i == date.getDate()) {
              //달력에 있는 년,달과 내 컴퓨터의 로컬 년,달이 같고, 일이 오늘의 일과 같으면
            cell.bgColor = "#ebebeb";//셀의 배경색 
           }
         }
    }
    buildCalendar();
});


























