const word_above      = "出勤したら打刻をしましょう!";
const begin           = "出勤";
const rest_start      = "休憩開始";
const rest_end        = "休憩終了";
const finish          = "退勤";
const do_it_again     = "やり直し";

function $(a) { return document.getElementById(a); }

//idで指定し、要素を取得する。取得した要素のテキスト情報に上記で定義したものを代入し、上書きする。
$("top").textContent          = word_above;
$("top_left").textContent     = begin;
$("top_right").textContent    = finish;
$("bottom_left").textContent  = rest_start;
$("bottom_right").textContent = rest_end;
$("again").textContent        = do_it_again;
$("eng_view").textContent     = "English";

const begin_button = $("top_left");
//出勤ボタンをクリックすると、打刻履歴に追加
begin_button.addEventListener("click", function() {
    //二度押し防止
    begin_button.disabled = true;
    //テキスト情報が"出勤"である場合
    if (begin_button.textContent == begin){
        $("top").textContent = "業務中";
        const li = document.createElement("li");
        li.textContent = word_history + " " + begin;
        //打刻履歴の末尾にliを追加
        $("history_left").appendChild(li);
    }
    //テキスト情報がそれ以外（つまり"Begin"）の場合
    else{
        $("top").textContent = "Working";
        const li = document.createElement("li");
        li.textContent = word_history + " " + "Begin";
        $("history_left").appendChild(li);
    }
    //時刻はどちらの場合でも、変更点がないため条件を設けなくてよい
    const li1 = document.createElement("li1");
    li1.textContent = time_history + "\n";
    $("history_right").appendChild(li1);
});

const finish_button = $("top_right");
//退勤ボタンをクリックすると、打刻履歴に追加
finish_button.addEventListener("click", function (){
    finish_button.disabled = true;
    //テキスト情報が"退勤"である場合  
    if(finish_button.textContent == finish){
        $("top").textContent = "業務終了です。お疲れさまでした";
        const li = document.createElement("li");
        li.textContent = word_history + " " + finish;
        $("history_left").appendChild(li);
    //ダイアログを表示
        window.alert("お疲れさまでした");
    }
    //それ以外(="Finish")
    else{
        $("top").textContent = "Finished today's work!";
        const li = document.createElement("li");
        li.textContent = word_history + " " + "Finish";
        $("history_left").appendChild(li);
        window.alert("Today's work has been finished");
    }
    const li1 = document.createElement("li1");
    li1.textContent = time_history + "\n";
    $("history_right").appendChild(li1);
});

const rest_start_button = $("bottom_left");
//休憩開始ボタンをクリックすると、打刻履歴に追加
rest_start_button.addEventListener("click", function() {
    //テキスト情報が"休憩開始"である場合
    if (rest_start_button.textContent == rest_start){
        $("top").textContent = "休憩中";
        const li = document.createElement("li");
        li.textContent = word_history + " " + rest_start;
        $("history_left").appendChild(li);
    }
    //それ以外(="Taking a break")の場合
    else{
        $("top").textContent = "Taking a break";
        const li = document.createElement("li");
        li.textContent = word_history + " " + "Take a break";
        $("history_left").appendChild(li);
    }
    const li1 = document.createElement("li1");
    li1.textContent = time_history + "\n";
    $("history_right").appendChild(li1);
});

const rest_end_button = $("bottom_right")
//休憩終了をクリックすると、打刻履歴に追加
rest_end_button.addEventListener("click", function() {
    //テキスト情報が"休憩終了"である場合  
     if(rest_end_button.textContent == rest_end){
        $("top").textContent = "業務中";
        const li = document.createElement("li");
        li.textContent = word_history + " " + rest_end;
        $("history_left").appendChild(li);
    } 
    //それ以外(="Back to work")
    else{
        $("top").textContent = "Working";
        const li = document.createElement("li");
        li.textContent = word_history + " " + "Back to work";
        $("history_left").appendChild(li);
    }
    const li1 = document.createElement("li1");
    li1.textContent = time_history + "\n";
    $("history_right").appendChild(li1);
});



//現在時刻を表示させる。
function current_time(){
 const time = new Date();
 const year = two_digits(time.getFullYear());
 const month= two_digits(time.getMonth()+1);
 const day  = two_digits(time.getDate());
 const hour = two_digits(time.getHours());
 const min  = two_digits(time.getMinutes());
 const sec  = two_digits(time.getSeconds());

 //曜日を取得
 const days = ["日","月","火","水","木","金","土"];
 const dayofweek = days[time.getDay()];
 //英語表記用
 const days_eng = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 const dayofweek_eng = days_eng[time.getDay()];
//打刻履歴に表示する際の形式
word_history =  year + "/" + month + "/" + day;
//打刻履歴に文字を除いた時刻のみを表示させたいので、time_historyを作成
time_history = hour + ":" + min;

//言語切替ボタンを押す際のテキスト情報によって、時刻の表示を変える
//173行目で変数eng_buttonを作成済み
//テキスト情報が"English"の場合
if(eng_button.textContent == "English"){
    $("clock_view").textContent = year + "年"+ month + "月" + day + "日" +  "（" + dayofweek + "）" + ":" + hour + ":" + min + ":" +sec;
}
//それ以外（＝"日本語"の場合）　
else{
    $("clock_view").textContent = dayofweek_eng + "," + " " + month + "/" + day + "/" + year + " : " + hour + ":" + min + ":" + sec;
}
}
//1秒ごとに実行
setInterval("current_time()",1000);

//時刻の数字を二桁表示させる
function two_digits(num){
    let digit;
    //0~9までの数字の時に"0"を追加し、二桁表示させる
    if(num < 10){
        digit = "0" + num;
    }
    //それ以外は常時二桁なのでそのまま代入
    else{
        digit = num;
    }
    return digit;
}

//"やり直し"ボタンを押した際に最終履歴を削除
const again_button = $("again")//
again_button.addEventListener("click", function (){
    const parent_word_history = $('history_left');
//最後の子ノードを取り除く
    parent_word_history.removeChild(parent_word_history.lastChild);  
//時刻も同様 
    const parent_time_history = $('history_right');
    parent_time_history.removeChild(parent_time_history.lastChild);   
});

//"English"ボタンを押して、英語表示
const eng_button = $("eng_view");
eng_button.addEventListener("click", function(){
    //ボタンを押す前のテキスト情報が"English"であれば、英語表記させる
    if (eng_button.textContent == "English"){
        eng_button.textContent           ="日本語";
        $("top").textContent             = "Be sure to push the ”Begin” button before the work!";
        $("top_left").textContent        = "Begin";
        $("top_right").textContent       = "Finish";
        $("bottom_left").textContent     = "Take a break";
        $("bottom_right").textContent    = "Back to work";
        $("again").textContent           = "Do it again";
        $("table_top_left").textContent  = "　　History";
        $("table_top_right").textContent = "　　Time";
    }
    //それ以外（テキスト情報が"日本語"）であれば、日本語表記させる
    else{
        eng_button.textContent           ="English";
        $("top").textContent             = word_above;
        $("top_left").textContent        = begin;
        $("top_right").textContent       = finish;
        $("bottom_left").textContent     = rest_start;
        $("bottom_right").textContent    = rest_end;
        $("again").textContent           = do_it_again;  
        $("table_top_left").textContent  = "　　打刻履歴";
        $("table_top_right").textContent = "　　時間"; 
    }
});

