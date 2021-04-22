const mongoose = require('mongoose');
const agendamentoModel = require('../models/agendamento-model');

exports.adicionarAgendamento = async (req, res) => {
try {    
    agendamentoModel.find((err, pessoa) => {
    if(err){
        console.log("Não foi possível recuperar o agendamento!");
        res.json({
            status: "erro",
            message: "Não foi possível recuperar agendamento e portanto inserir um novo agendamento!"
        });
    }
    //Eu tenho a lista dos alunos
    for(let i = 0; i < pessoa.length; i++){
        if(req.body.cpf_pessoa === pessoa[i].cpf_pessoa){
            res.json({
                status: "erro",
                message: `Já existe um agendamento marcado para data ${req.body.data_hora_agendamento}`
            });
            return;
        }
    }

    let neAgendamento = new agendamentoModel();
    neAgendamento.pessoa_id =  req.body.pessoa_id;
    neAgendamento.data_hora_agendamento = req.body.data_hora_agendamento;
    neAgendamento.necessidade_especiais = req.body.necessidade_especiais;
    newPessoa.observação_agendamento = req.body.observação_agendamento; 
  
    
    neAgendamento.save((erro) => {
        if(erro){
            res.send({
                status: "erro",
                message: "Não foi possível inserir o novo agendamento."
            });
        }else{
            res.send({
                status: "ok",
                message: `Usuário ID: ${req.body.pessoa_id}, agendado com sucesso com sucesso!`
            });
        }
    })
});




} catch (error) {
  console.log(error);
  res.status(400).json({ error: "Erro ao agendar um novo horario" });
}

}



exports.listarAgendamento = async (req, res) => {
try {       
  const agendamento = await agendamentoModel.find();
    return res.json({ agendamento })    

   }catch (error){
    console.log(error);
    res.status(400).json({ error: "Erro ao carregar Lista de Horarios Disponiveis!" });
   }
}

exports.listarAgendamentoPorID = async (req, res) => {
  try {       
    const unidadeDeSaude = await agendamentoModel.findById(req.params.id);
    return res.send({ unidadeDeSaude })   
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao Localizar o horario de Agendamento!" });
       }
}

exports.atualizarAgendamento = (req, res) => {
  let id_Agendamento = req.params.id;

  agendamentoModel.findById(id_Agendamento, (erro, agendamento) => {
      if(erro || !unidade){
          console.log("Não foi possível recuperar as Unidades de Saúde!");
          res.json({
              status: "erro",
              message: `Não foi possível recuperar a unidade de saúde de id ${id_Agendamento} para atualização!`
          });
      }else{
        agendamento.pessoa_id =  req.body.pessoa_id;
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidade_especiais = req.body.necessidade_especiais;
        agendamento.observação_agendamento = req.body.observação_agendamento; 
      
      
        agendamento.save((err => {
              if(err){
                  res.json({
                      status: "erro",
                      message: "Houve um erro ao atualizar o agendamento de saúde!"
                  });
              }else{
                  res.json({
                      status: "ok",
                      message: `Agendamento ${data_hora_agendamento}, atualizado com sucesso!`,
                      novoAgendamento: agendamento
                  })
              }
          }))
      }
  });  
}

exports.removerAgendamento = async (req, res) => {
  try {       
    const pessoa = await agendamentoModel.findByIdAndRemove(req.params.id);
    return res.json({ status: "ok",
                      message: `Usuário ID: ${req.params.id}, removido com sucesso!`

    })    
    
       } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Erro ao deletar o usuário!" });
       }
}