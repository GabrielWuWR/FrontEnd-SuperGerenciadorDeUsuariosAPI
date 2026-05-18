'use strict';

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js";

const novoContato = {
    "nome": "Gabriel",
    "celular": "11 97171-6464",
    "foto": "https://img.freepik.com/psd-gratuitas/renderizacao-3d-do-estilo-de-cabelo-para-o-design-do-avatar_23-2151869121.jpg",
    "email": "gabriel@gmail.com",
    "endereco": "Av. São Joaquim, 234",
    "cidade": "Itapevi"
}

function criaContato(contato) {
    let container = document.getElementById('containerUsers');
    
    let containerUsuario = document.createElement('div');
    containerUsuario.className = 'userItemContainer';

    let containerId = document.createElement('div');
    containerId.className = 'containerId';
    let containerTextoId = document.createElement('p');
    containerTextoId.textContent = contato.id;
    containerId.appendChild(containerTextoId);

    let containerNome = document.createElement('div');
    containerNome.className = 'containerNome';
    let containerTextoNome = document.createElement('p');
    containerTextoNome.textContent = contato.nome;
    containerNome.appendChild(containerTextoNome);

    let containerImagem = document.createElement('div');
    containerImagem.className = 'containerImagem';
    let containerTextoImagem = document.createElement('p');
    containerTextoImagem.textContent = contato.foto; 
    containerImagem.appendChild(containerTextoImagem);

    let containerAcoes = document.createElement('div');
    containerAcoes.className = 'containerAcoes';

    let btnAtualizar = document.createElement('div');
    btnAtualizar.className = 'btnAtualizar containerEstilo';
    let txtAtualizar = document.createElement('p');
    txtAtualizar.textContent = 'Atualizar';
    btnAtualizar.appendChild(txtAtualizar);

    let btnDeletar = document.createElement('div');
    btnDeletar.className = 'btnDeletar containerEstiloVermelho';
    let txtDeletar = document.createElement('p');
    txtDeletar.textContent = 'Deletar';
    btnDeletar.appendChild(txtDeletar);

    containerAcoes.appendChild(btnAtualizar);
    containerAcoes.appendChild(btnDeletar);

    containerUsuario.append(containerId, containerNome, containerImagem, containerAcoes);
    container.append(containerUsuario);
}

async function preencherLista() {
    let contatos = await getContatos();

    contatos.forEach((contato) =>{
        if(contato.nome != '' && contato.foto != '' && contato.nome != null && contato.nome != undefined && contato.foto != null && contato.foto != undefined) {
            criaContato(contato);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    preencherLista();
});