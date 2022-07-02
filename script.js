// tag 가져오기
const $computer = document.querySelector("#computer"); // 컴퓨터 이미지
const $score = document.querySelector("#score"); // 점수 태그
const $rock = document.querySelector("#rock"); // 바위 버튼
const $paper = document.querySelector("#paper"); // 보 버튼
const $sicssors = document.querySelector("#scissors"); // 가위 버튼

// 이미지 배열 
let img_url = ["images/rock.png", "images/paper.png", "images/scissors.png"]; 
$computer.src = `${img_url[0]}`;

// 컴퓨터의 선택(0:rock, 1:paper, 2:sicssors)
let computerChoice = 0;

// 컴퓨터 이미지 모양 바꾸기
function changeComputerHand(){
    computerChoice++;
    if(computerChoice > 2) computerChoice = 0;
    $computer.src = `${img_url[computerChoice]}`;
}

let computerInterval = setInterval(changeComputerHand, 50) // (실행함수, 주기)

let clickable = true; // 3개의 버튼 다중 클릭 방지용 변수
let score = 0; // 점수 변수

// 사용자가 버튼 눌렀을 떄 실행할 함수
function clickButton(event){
    if(clickable){
        clickable = false; // 다중클릭 방지
        clearInterval(computerInterval); // 컴퓨터 이미지 변경 멈추기
        // console.log(event.target.innerText); // 가위, 바위, 보
        const myChoice = event.target.innerText; // 내가 선택한 가위바위보
        let resultMsg; // 결과 메세지
        // computerChoice => 0:rock, 1:paper, 2:scissors
        if(myChoice === "가위"){
            if(computerChoice === 0) resultMsg = "패배";
            else if(computerChoice === 1) resultMsg = "승리";
            else resultMsg = "무승부";
        }
        else if(myChoice === "바위"){
            if(computerChoice === 0) resultMsg = "무승부";
            else if(computerChoice === 1) resultMsg = "패배";
            else resultMsg = "승리";
        }
        else{
            if(computerChoice === 0) resultMsg = "승리";
            else if(computerChoice === 1) resultMsg = "무승부";
            else resultMsg = "패배";
        }

        // 점수 처리
        if(resultMsg === "승리") score++; // 점수 1점 증가
        else if(resultMsg === "패배") score--; // 점수 1점 감소

        // 점수, 결과 출력
        $score.innerText = `${resultMsg}, 총점 : ${score}점`;

        // 다음번 실행은 2초후
        setTimeout(() => {
            clickable = true; // 3개의 버튼 클릭했을 때 함수가 실행되게
            computerInterval = setInterval(changeComputerHand, 50); // 다시 이미지 변경실행
        }, 2000); // (2000 === 2초)
    }
}

// 3개의 버튼 태그에 이벤트-리스너 설정 
$rock.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
$sicssors.addEventListener("click", clickButton);
