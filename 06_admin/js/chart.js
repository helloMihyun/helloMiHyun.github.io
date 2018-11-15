$(document).ready(function(){// 최신버전 차트 불러오기
// Load Charts and the corechart and barchart packages.
google.charts.load('current', {'packages':['corechart']});
// Draw the pie chart and bar chart when Charts is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data1 = google.visualization.arrayToDataTable([
        ['', '전체', '일반회원', '채용담당자'],
        ['10-01', 120, 20, 10],
        ['10-02', 132, 30, 3],
        ['10-03', 100, 50, 5],
        ['10-04', 200, 65, 15],
        ['10-05', 157, 77, 16],
        ['10-06', 324, 78, 37],
        ['10-07', 547, 56, 15]
    ]);
    
    var data2 = google.visualization.arrayToDataTable([
        ['', '접수대기', '접수중'],
        ['10-01', 6, 20],
        ['10-02', 10, 50],
        ['10-03', 30, 55],
        ['10-04', 12, 65],
        ['10-05', 50, 57],
        ['10-06', 12, 78],
        ['10-07', 6, 46]
    ]);
    
    var data3 = google.visualization.arrayToDataTable([
          ['유입경로', '유입된 수'],
          ['Daum', 1],
          ['Google', 3],
          ['Nate',  1],
          ['Naver', 5],
          ['Other', 1]
    ]);

    var options1 = {title:''};
    var chart1 = new google.visualization.ColumnChart(document.getElementById('chart1'));
    chart1.draw(data1, options1);

    var options2 = {title:''};
    var chart2 = new google.visualization.ColumnChart(document.getElementById('chart2'));
    chart2.draw(data2, options2);
    
    var options3 = {title: '', pieHole: 0};
    var chart3 = new google.visualization.PieChart(document.getElementById('chart3'));
    chart3.draw(data3, options3);
    }

    $(window).on('resize', function() {
        google.charts.setOnLoadCallback(drawChart);
    });

        
      
      
      
  });