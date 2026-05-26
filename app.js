'use strict';

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js";

function criarMensagem(tipo, mensagem) {
    let containerMensagem = document.createElement('div');

    if (document.querySelector('.mensagem')) {
        return;
    }

    if (tipo == 'erro') {
        containerMensagem.className = 'mensagem containerEstiloVermelho';
    } else if (tipo == 'normal') {
        containerMensagem.className = 'mensagem containerEstilo';
    }

    let texto = document.createElement('p');
    texto.textContent = mensagem;

    containerMensagem.appendChild(texto);
    document.body.appendChild(containerMensagem);

    containerMensagem.addEventListener('animationend', () => {
        containerMensagem.remove();
    });
}

let containerNome = document.getElementById('inputNome');
let containerCelular = document.getElementById('inputCelular');
let containerFoto = document.getElementById('inputFoto');
let containerEmail = document.getElementById('inputEmail');
let containerEndereco = document.getElementById('inputEndereco');
let containerCidade = document.getElementById('inputCidade');

let estado = "criacao";
let edicaoAtual = 0;

function gerarJsonContato() {
    if (containerNome.value.trim() == '' || containerCelular.value.trim() == '' || containerFoto.value.trim() == '' || containerEmail.value.trim() == '' || containerEndereco.value.trim() == '' || containerCidade.value.trim() == '') {
        return false;
    } else {
        let contato = {
            nome: containerNome.value,
            celular: containerCelular.value,
            foto: containerFoto.value,
            email: containerEmail.value,
            endereco: containerEndereco.value,
            cidade: containerCidade.value
        };

        return contato;
    }
}

async function criarContato() {
    let contato = gerarJsonContato();

    if (contato) {
        console.log(contato)
        let resultCriarContato = await postContato(contato);

        if (resultCriarContato) {
            criarMensagem('normal', 'Contato Criado com sucesso 💕');
            setTimeout(() => {
                location.reload();
            }, 3000)
        } else {
            criarMensagem('erro', 'Não conseguimos processar sua requisição 😿');
        }
    } else {
        criarMensagem('erro', 'Os dados não podem ser vazios');
    }
}

function habilitarEdicao(contato) {
    edicaoAtual = contato.id;
    estado = "edicao";
    document.getElementById('cadastrar').textContent = "Editar";

    containerNome.value = contato.nome;
    containerCelular.value = contato.celular;
    containerFoto.value = contato.foto;
    containerEmail.value = contato.email;
    containerEndereco.value = contato.endereco;
    containerCidade.value = contato.cidade;
}

async function editarContato() {
    if (estado == "edicao" && edicaoAtual != 0) {
        let contato = gerarJsonContato();

        if (contato) {
            let resultAtualizarContato = await putContato(edicaoAtual, contato);

            if (resultAtualizarContato) {
                criarMensagem('normal', 'Contato Atualizado com sucesso 🌵');
                estado = "criacao";
                document.getElementById('cadastrar').textContent = "Cadastrar";

                edicaoAtual = 0;
                setTimeout(() => {
                    location.reload();
                }, 3000)
            } else {
                criarMensagem('erro', 'Não foi possivel atualizar seu contato');
            }
        }
    }
};

async function excluirContato(id) {
    let resultExcluir = await deleteContato(id);

    if (resultExcluir) {
        criarMensagem('normal', 'Contato excluido com sucesso');
        setTimeout(() => {
            location.reload();
        }, 3000)
    } else {
        criarMensagem('erro', 'Ops algo aconteceu');
    }
}

function criaContainerContato(contato) {
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
    txtAtualizar.textContent = 'Editar';
    btnAtualizar.appendChild(txtAtualizar);
    btnAtualizar.onclick = () => ('click', habilitarEdicao(contato));

    let btnDeletar = document.createElement('div');
    btnDeletar.className = 'btnDeletar containerEstiloVermelho';
    let txtDeletar = document.createElement('p');
    txtDeletar.textContent = 'Deletar';
    btnDeletar.appendChild(txtDeletar);
    btnDeletar.onclick = () => ('click', excluirContato(contato.id));

    containerAcoes.appendChild(btnAtualizar);
    containerAcoes.appendChild(btnDeletar);

    containerUsuario.append(containerId, containerNome, containerImagem, containerAcoes);
    container.append(containerUsuario);
}

async function preencherLista() {
    let contatos = await getContatos();

    contatos.forEach((contato) => {
        if (contato.nome != '' && contato.foto != '' && contato.nome != null && contato.nome != undefined && contato.foto != null && contato.foto != undefined) {
            criaContainerContato(contato);
        }
    });
}

async function criaOuAtualizaContato() {
    if (estado == "criacao") {
        await criarContato();
    } else if (estado == "edicao") {
        await editarContato();
    }
}

document.getElementById('cadastrar').addEventListener('click', criaOuAtualizaContato);

document.addEventListener("DOMContentLoaded", function () {
    preencherLista();
});

function mostrarMensagem() {
    let mensagens = [
        "aaaa",
        "bbbb",
        "cccc"
    ];

    let mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
    criarMensagem("normal", mensagemAleatoria);
};

document.getElementById('header').addEventListener('click', mostrarMensagem);

const botao = document.getElementById('cadastrar');

let containerBolhas = document.querySelector('.containerBolhas');

botao.addEventListener('mouseenter', () => {

    for (let i = 0; i < 15; i++) {
        let bolha = document.createElement('div');
        bolha.classList.add('bolha');
        let tamanho = Math.random() * 30 + 10;

        bolha.style.width = `${tamanho}px`;
        bolha.style.height = `${tamanho}px`;
        bolha.style.left = `${Math.random() * 100}%`;
        bolha.style.animationDuration = `${Math.random() * 3 + 3}s`;
        bolha.style.animationDelay = `${Math.random() * 1}s`;

        containerBolhas.append(bolha);

        setTimeout(() => {
            bolha.remove();
        }, 7000);
    };
});