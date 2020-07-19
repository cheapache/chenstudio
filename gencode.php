<?php

    $host = "127.0.0.1";
    $user = "sa";
    $pwd = "9xAl54Tn";
    $dbname = "homework_dhm";
    $conn;
    
    $conn = new mysqli($host, $user, $pwd, $dbname);
    $conn->query('SET NAMES UTF8');

    $tb_code = 'tb_code';
    $query = "";

    /*$query = "INSERT INTO " .$tb_code. " (
        serialcode,
        flag,
        flaguse,
        type,
        userid,
        point,
        extra_point,
        startdate,
        enddate,
        created) VALUES ";

    for ($i = 0; $i < 20; $i++){

        if ($i == 0){
            $query .= "(
                '" .uniqid(). "',
                'Y',
                'N',
                'N',
                0,
                " .rand(5, 20). ",
                0,
                '2020-07-18 00:00:00',
                '2020-07-20 00:00:00',
                NOW())";
        }
        else{
            $query .= ", (
                '" .uniqid(). "',
                'Y',
                'N',
                'N',
                0,
                " .rand(5, 20). ",
                0,
                '2020-07-18 00:00:00',
                '2020-07-20 00:00:00',
                NOW())";
        }

    }

    $query .= ";";

    die($query);

    $stmt = $conn->query($query);
    $conn->close();*/


    $query_sp = "INSERT INTO " .$tb_code. " (
        serialcode,
        flag,
        flaguse,
        type,
        userid,
        point,
        extra_point,
        startdate,
        enddate,
        created) VALUES ";

    for ($j = 0; $j < 20; $j++){

        if ($j == 0){
            $query_sp .= "(
                '" .uniqid(). "',
                'Y',
                'N',
                'S',
                0,
                " .rand(5, 20). ",
                " .rand(1, 10). ",
                '2020-07-18 00:00:00',
                '2020-07-20 00:00:00',
                NOW())";
        }
        else{
            $query_sp .= ", (
                '" .uniqid(). "',
                'Y',
                'N',
                'S',
                0,
                " .rand(5, 20). ",
                " .rand(1, 10). ",
                '2020-07-18 00:00:00',
                '2020-07-20 00:00:00',
                NOW())";
        }

    }

    $query_sp .= ";";

    $stmt_sp = $conn->query($query_sp);
    $conn->close();

?>