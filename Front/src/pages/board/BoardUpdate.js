import React from "react";
import { useState, useEffect } from "react";
import { DetailBoardFetchData } from "../../Api/BoardData";
import { ForPostUpdateBoard } from "../../Api/BoardData";

function BoardUpdate({ boardNo }) {
  //  불러온 게시글 정보를 저장할 공간
  const [board, setBoard] = useState([]);
  //   해당유저의 세션아이디
  const userSession = sessionStorage.getItem("sessionId");
  // 사진파일: 여러개 올릴 경우를 대비해 "" 이 아닌 []로 설정했다. 사용자가 미리 보기하기 위한 state
  const [fileImage, setFileImage] = useState([]);
  // 선택된 이미지
  const [selectImage, setSelectImage] = useState([]);
  //  입력한 게시글
  const [newBoardContent, setNewBoardContent] = useState("");
  // 기존이미지 <-> 선택한이미지
  const [isVisible, setIsVisible] = useState(false);
  // 클릭하면 이미지 바뀜
  function handleClick() {
    setIsVisible(!isVisible);
  }
  //  게시글 수정 페이지 접속 시 기존 게시글 정보를 백에서 받아와서 board에 넣어줌
  useEffect(() => {
    const response = DetailBoardFetchData(boardNo);
    response.then((data) => setBoard(data));
  }, []);
  //   회원이 수정안할경우 기존 데이터 백에 보내기 위해 저장함
  useEffect(() => {
    setNewBoardContent(`${board.boardContent}`);
    setSelectImage(null);
  }, [board]);
  // 파일 선택하기 버튼을 누르면 사진을 추가할 수 있고 화면에 미리보기 할 수 있게 해주는 함수
  const addImage = (e) => {
    e.preventDefault();
    // 선택된 파일을 selectImage로 선언
    const selectImage = e.target.files;
    // 현재 fileImage를 복사
    const fileImageCopy = [...fileImage];
    // for문을 통해 사진을 여러개 넣을 수 있다.
    for (let i = 0; i < selectImage.length; i += 1) {
      console.log(selectImage[i]);
      console.log(selectImage[i].name);
      // 리엑트에서 input에 사진을 넣으면 해당 사진의 상대경로를 콘솔에서 블러처리한다.
      // 따라서 URL.createObjectURL을 사용해서 업로드된 파일의 상대경로를 만들어주면된다.
      const fileImageURL = URL.createObjectURL(selectImage[i]);
      // 위에 복사해둔 fileImageCopy에 미리보기 할 사진을 추가한다.
      fileImageCopy.push(fileImageURL);
    }
    // 복사한 파일을 setFileImage를 통해 fileImage를 통해 변경한다. -> 바뀐 fileImage를 통해 화면에서 우리가 선택한 이미지를 볼 수 있다.
    setFileImage(fileImageCopy);
    // 선택된 이미지 파일을 selectImage에 넣어 백에 보낼 때 사용한다.
    setSelectImage(selectImage[0]);
    setIsVisible(!isVisible);
  };
  // 입력한 boardContent 변화 감지
  const boardContentHandler = (e) => {
    setNewBoardContent(e.target.value);
  };
  // 수정한 이미지와 게시글을 백에 보내기 위해 FormData에 넣어줌
  const createUpdateBoardData = (e) => {
    e.preventDefault();
    let updateBoardData = new FormData();
    // 새롭게 선택하거나 기존 이미지 파일 보내기
    updateBoardData.append("sessionId", userSession);
    updateBoardData.append("images", selectImage);
    updateBoardData.append("boardNo", boardNo);
    updateBoardData.append("boardContent", newBoardContent);
    ForPostUpdateBoard(updateBoardData);
    window.location.reload();
  };

  return (
    <>
      <br />
      <form encType="multipart/form-data">
        <div className="BoardUpdate-outerBox">
          <div className="BoardUpdate-innerBox">
            <div className="BoardUpdate-box">
              <div className="BoardUpdate-header">
                <div className="BoardUpdate-leftBox">
                  {/* <span className="BoardUpdate-prevImgContent">기존이미지</span>
                  <span className="BoardUpdate-selectImgContent">
                    변경할 이미지
                  </span> */}
                  <br />
                  {/* 기존 파일 이미지 띄우기 */}
                  {board.files &&
                    board.files.map((file) => (
                      <img
                        key={file}
                        className="BoardUpdate-defaultImg"
                        src={`${file.filePath + file.fileName}`}
                        alt="boardimage"
                        onClick={handleClick}
                      />
                    ))}

                  {isVisible ? (
                    <div>
                      {/* ??? 파일이미지와 파일이미지의 주소가 같다면 선택한 이미지파일을 화면에 미리보여준다. */}
                      {fileImage && (
                        <img
                          alt="미리보기 이미지"
                          src={fileImage}
                          style={{ margin: "auto" }}
                          width="350"
                          height="350"
                          className="BoardUpdate-selectedImg"
                        />
                      )}
                    </div>
                  ) : (
                    <label for="fileUpdate">
                      <img
                        className="BoardUpdate-prevImg"
                        src="/img/BoardWriteDefaultImg.png"
                        alt="imageAboutDefaultImg"
                      />
                    </label>
                  )}
                  {/* type = "file" accept image/*을 통해  형식의 파일만 올릴 수 있도록 한다. */}
                  <input
                    id="fileUpdate"
                    type="file"
                    name="file"
                    accept="image/*"
                    // multiple="multiple" // 여러개 선택 가능하게 -> 현재는 한개만 올릴 수 있도록 했기 떄문에 주석처리
                    onChange={addImage}
                    className="BoardUpdate-selectImg"
                  />
                  {/* </div> */}
                </div>
                <div className="BoardUpdate-rightBox">
                  <textarea
                    onChange={boardContentHandler}
                    className="BoardUpdate-boardContent"
                    placeholder="댓글을 입력해주세요!"
                    defaultValue={board.boardContent}
                    id="boardContent"
                  />
                </div>
              </div>
            </div>
            {/* 버튼을 누를시 선택한 파일과 작성된 게시글 데이터를 boardWriteData에 담아 이를 백에 전달한다. */}
            <button onClick={createUpdateBoardData}>게시글 수정</button>
          </div>
        </div>
      </form>
    </>
  );
}
export default BoardUpdate;