//자료형만 함수랑 정의할거라서 단일로 ts로 했음 타입스크립트.
//응답상황에서만 쓰이는 자료형
// 카에는 아이디컬럼 .. 디비로ㅓ등록이되어야 카의 아이디속성이생김. 카 리퀘스트에는 자료형엔 아디없음
// 리스폰스엔(받아올땐)잇음 백엔드는 dto. 요청을보낼때 username, password -
// cars내에잇는 하나의객체를 참조
/*
    brand : string;
  model : string;
  color :string;
  registrationNumber: string;
  modelYear: number;
  price :number;

이만큼만 보내고보여진다  */ 
export type CarResponse = {
  brand : string;
  model : string;
  color :string;
  registrationNumber: string;
  modelYear: number;
  price :number;
  _links :{
    self : {
      href:string;
    },car:{
      href:string;
    },
      owner:{
    href:string;
    }

};
}

export type Car = {
  brand : string;
  model : string;
  color :string;
  registrationNumber: string;
  modelYear: number;
  price :number;
}





