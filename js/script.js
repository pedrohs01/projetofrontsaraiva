function login(){
    const us = document.querySelector("#nomeusuario");
    const sh = document.querySelector("#senha");

    // usamos o comando trim para elmiar os espaços

    if(us.value.trim() == "" || sh.value.trim()==""){
        return alert("voce deve precher os campos")
    }

    fetch("http://127.0.0.1:4000/api/v1/users/login",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:us.value,
            senha:sh.value
        })
    }).then((res)=>res.json())
    .then((result)=>{
        console.log(result)
    })
    .catch((error)=>console.error(`erro ao tentar acessar a api ${error}`));



}

function cadastrarUsuario(){
    const us = document.querySelector("#txtusuario");
    const sh = document.querySelector("#txtsenha");
    const ft = document.querySelector("#txtfotoperfil");

    if(us.value.trim()=="" || sh.value.trim()=="" || ft.value.trim()==""){
        return alert("Prencha todos os campos")
    }
    fetch("http://127.0.0.1:4000/api/v1/users/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:us.value,
            senha:sh.value,
            foto:ft.value
        })
    })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>console.error(`erro na api ${error}`))
}

function carregarLivros(){
    const conteudo = document.querySelector(".conteudo");
    fetch("http://127.0.0.1:4001/api/v1/livros/detalhes")
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
            let card = `<div class="card" style="width: 18rem;">
            <img src=${rs.foto1} class="card-img-top" alt="...">
            <div class="card-body">
            <h3>${rs.nometitulo}</h3>
              <p class="card-text">Autor:${rs.autor} </p>
              <div class="containerflex">
              <p class="card-text">De R$ ${rs.precoatual} </p>
              <p class="card-text"> Por R$ ${rs.precodesconto<1 ? rs.precoatual : rs.precodesconto}</p>
              </div>
              <a class="btn btn-dark" href="detalhes.html?idlivro=${rs.idtitulos}">Saiba mais</a>
            </div>
          </div>`;

            conteudo.innerHTML += card;
        })
    })
    .catch((error)=>console.error(`erro na api ${error}`))
    
}

function detalhes(){
    let id_url = window.location.search.split('=');
    const conteudo = document.querySelector(".conteudo");

    fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/"+id_url[1])
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
          document.querySelector("h2").innerHTML = "Detalhes do livro: " +rs.nometitulo
            let card = ` <div class="card mb-3" col-md-10">
            <div class="row g-0">
              <div class="col-md-4" >
              <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="${rs.foto1}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto2}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto3}" class="d-block w-100" alt="...">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title">${rs.nometitulo}</h3>
                  <h5 class="card-title">${rs.autor}</h5>
                  <p class="card-text">${rs.sinopse}</p>
                  <p class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                  <br>
                  <a href="carrinho.html?idlivro=${rs.idtitulo} class="carrinho"> 
                  <img src=img/card.png widht=40 heigt=40"> incluir no carrinho</a>
                </div>
              </div>
            </div>
          </div>`;

            conteudo.innerHTML += card;
        })
    })
    .catch((error)=>console.error(`erro na api ${error}`))
}

function buscar(){

  const conteudo = document.querySelector(".conteudo");
  conteudo.innerHTML = "";
  let palavra = document.querySelector("input").value;
  document.querySelector("h2").innerHTML = `Você pesquisou por: ${palavra}`
  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/titulos/"+palavra)
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
            let card = ` <div class="card mb-3" col-md-10">
            <div class="row g-0">
              <div class="col-md-4" >
              <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="${rs.foto1}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto2}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="${rs.foto3}" class="d-block w-100" alt="...">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title">${rs.nometitulo}</h3>
                  <h5 class="card-title">${rs.autor}</h5>
                  <p class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                  <div>
                  <a class="btn btn-dark" href="detalhes.html?idlivro=${rs.idtitulos}">Saiba mais</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

            conteudo.innerHTML += card;
        })
    })
    .catch((error)=>console.error(`erro na api ${error}`))



}

function carregarCarrinho(){
  let id_url = window.location.search.split('=');
    const conteudo = document.querySelector(".conteudo");

    fetch("http://127.0.0.1:4002/api/v1/carrinho/listar"+id_url[1])
    .then((res)=>res.json())
    .then((dados)=>{
        dados.payload.map((rs)=>{
          document.querySelector("h2").innerHTML = "Detalhes do livro: " +rs.nometitulo
          let card = `<div class="card" style="width: 18rem;">
          <img src=${rs.foto1} class="card-img-top" alt="...">
          <div class="card-body">
          <h3>${rs.nometitulo}</h3>
            <p class="card-text">Autor:${rs.autor} </p>
            <div class="containerflex">
            <p class="card-text">De R$ ${rs.precoatual} </p>
            <p class="card-text"> Por R$ ${rs.precodesconto<1 ? rs.precoatual : rs.precodesconto}</p>
            </div>
            <a class="btn btn-dark" href="detalhes.html?idlivro=${rs.idtitulos}">Saiba mais</a>
          </div>
        </div>`;

            conteudo.innerHTML += card;
        })
    })
    .catch((error)=>console.error(`erro na api ${error}`))
}