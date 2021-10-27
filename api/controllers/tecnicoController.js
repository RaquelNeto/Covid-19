const Pedido = require('../models/pedido');
const email = require('../middleware/email');
const User = require('../models/User');
const pdf = require('html-pdf');
const ejs = require('ejs');
var validateDate = require('validate-date');
var path = require('path');


const absolutePath = path.resolve(__dirname + '../../../views/pdf.ejs');
const absolutePath2 = path.resolve(__dirname + '../../uploads/');



//eliminar pedido por parte do técnico
const eliminarPedido = async(req, res) => {
    const pedidoeliminado = await Pedido.deleteOne({ _id: req.params.idutilizador, status: 'Em espera...' }, (err) => {
        if (err) {
            return res.status(400).send('Erro a eliminar');
        } else {
            return res.json('Pedido eliminado');
        }
    });
};

//aceitar pedido por parte do técnico
const aceitarpedido = async(req, res) => {
    if (req.user) {
        const user = await User.findOne({ numero_utente: req.user.numero_utente });
        const pedido_data = await Pedido.find({ _id: req.params.idutilizador, status: 'Em espera...' });


        if (pedido_data.length > 0) {
            if (validateDate(req.body.datarealizacao)) {
                // if(req.body.datarealizacao > pedido_data.datapedido){

                const pedido = await Pedido.updateMany({ _id: req.params.idutilizador, status: 'Em espera...' }, { datarealizacao: req.body.datarealizacao, status: 'Aceite', nome_do_tecnico: user.nome },
                    (err, found) => {
                        if (err) {

                            return res.status(400).send(err);
                        } else {
                            email(
                                'Data de maracação do teste',
                                'A data de realização do seu teste é: ' + req.body.datarealizacao,
                                pedido_data.email
                            );
                            res.send('Dados atualizados com sucesso!');
                        }
                    }
                );
                // }else{
                //	 res.status(400).send("Data invalida!" + "\n" + "Tem que ser maior da data do pedido!");
                // }
            } else {
                res.status(400).send('Data invalida!');
            }
        } else {
            res.status(400).send('Sem pedidos!');
        }
    } else {
        res.status(400).send('Tem que estar autenticado');
    }
};

//mudar para id no mongodb

//lançar resultado por parte do técnico
const lancarresultado = async(req, res) => {
    if (req.user) {
        const utilizador_tecnico = await User.findOne({ numero_utente: req.user.numero_utente });
        const pedido_feito = await Pedido.findOne({ _id: req.params.idutilizador, status: 'Aceite' });

        const user_id = pedido_feito.numero_utente;
        const user = await User.findOne({ numero_utente: user_id });
        const pedidos_utilizador = await Pedido.find({ numero_utente: user.numero_utente, status: 'Terminado' });

        if (pedido_feito) {
            if (req.body.resultado == 'Não Infetado') {

                if (pedidos_utilizador.length < 2) {
                    const pedido1 = new Pedido({
                            nome: user.nome,
                            data_de_nascimento: user.data_de_nascimento,
                            sexo: user.sexo,
                            morada: user.morada,
                            numero_utente: user.numero_utente,
                            profissao: user.profissao,
                            telemovel: user.telemovel,
                            email: user.email,
                            datapedido: pedido_feito.datapedido,
                            datarealizacao: new Date(Date.now() + 172800000),
                            dataresultado: new Date(Date.now()),
                            resultado: req.body.resultado,
                            recomendacao: pedido_feito.recomendacao,
                            grupo_de_risco: pedido_feito.grupo_de_risco,
                            pq_risco: pedido_feito.pq_risco,
                            nome_do_tecnico: utilizador_tecnico.nome,
                            status: 'Aceite',
                        },
                        (err) => {
                            if (err) {

                                res.status(400).send(err);
                            } else {
                                email(
                                    'data de maracação do teste',
                                    'a data de realização do seu teste é: ' + new date(date.now() + 172800000),
                                    user.email
                                );

                                res.send('Mandado com sucesso');
                            }
                        }
                    );

                    try {
                        const guardarPedido = await pedido1.save();;
                    } catch (err) {

                        res.status(400).send(err);
                    }

                    const pedido = await Pedido.updateOne({ _id: pedido_feito._id, status: 'Aceite', resultado: pedido_feito.resultado }, {
                            dataresultado: new Date().toLocaleDateString(),
                            status: 'Terminado',
                            resultado: req.body.resultado,
                            Teste_Realizado: true,
                        },
                        (err, found) => {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                ejs.renderFile(
                                    absolutePath, {
                                        nome_paciente: user.nome,
                                        numero_utente: user.numero_utente,
                                        morada: user.morada,
                                        telemovel: user.telemovel,
                                        email: user.email,
                                        resultado: user.resultado,
                                        nome_tecnico: utilizador_tecnico.nome,
                                    }, {},
                                    (err, html) => {
                                        if (err) {
                                            return res.status(400).send(err);
                                        } else {

                                            pdf.create(html, {}).toFile(
                                                absolutePath2 + '/uploads' +

                                                user_id +
                                                new Date().toLocaleDateString() +
                                                '.pdf',
                                                (err, found) => {
                                                    if (err) {
                                                        res.status(400).send(err);
                                                    } else {

                                                        email(
                                                            'Resultado do teste',
                                                            'O resulta do seu teste é: ' + req.body.resultado,
                                                            user.email
                                                        );
                                                        res.send('Resultado Lançado!');
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                } else

                if (pedidos_utilizador.length == 0) {
                    const pedido = await Pedido.updateOne({ _id: req.params.idutilizador, status: 'Aceite', resultado: pedido_feito.resultado }, {
                            dataresultado: new Date().toLocaleDateString(),
                            status: 'Terminado',
                            resultado: req.body.resultado,
                            Teste_Realizado: true,
                        },
                        (err, found) => {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                ejs.renderFile(
                                    absolutePath, {
                                        nome_paciente: user.nome,
                                        numero_utente: user.numero_utente,
                                        morada: user.morada,
                                        telemovel: user.telemovel,
                                        email: user.email,
                                        resultado: user.resultado,
                                        nome_tecnico: utilizador_tecnico.nome,
                                    }, {},
                                    (err, html) => {
                                        if (err) {
                                            return res.status(400).send(err);
                                        } else {

                                            pdf.create(html, {}).toFile(
                                                absolutePath2 + '/uploads' +

                                                user_id +
                                                new Date().toLocaleDateString() +
                                                '.pdf',
                                                (err, found) => {
                                                    if (err) {
                                                        res.status(400).send(err);
                                                    } else {

                                                        email(
                                                            'Resultado do teste',
                                                            'O resulta do seu teste é: ' + req.body.resultado,
                                                            user.email
                                                        );
                                                        res.send('Resultado Lançado!');
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );

                    const update_user = await User.updateOne({ numero_utente: user_id }, { Estado: user.resultado, Teste_Realizado: true },
                        (err) => {
                            if (err) {
                                res.status(400).send('Não atualizou user!');
                            }
                        }
                    );
                } else {
                    const pedido = await Pedido.updateOne({ _id: req.params.idutilizador, status: 'Aceite', resultado: pedido_feito.resultado }, {
                            dataresultado: new Date().toLocaleDateString(),
                            status: 'Terminado',
                            resultado: req.body.resultado,
                        },
                        (err, found) => {
                            if (err) {
                                res.status(400).send(err);
                            } else {

                                ejs.renderFile(
                                    absolutePath, {
                                        nome_paciente: user.nome,
                                        numero_utente: user.numero_utente,
                                        morada: user.morada,
                                        telemovel: user.telemovel,
                                        email: user.email,
                                        resultado: req.body.resultado,
                                        nome_tecnico: utilizador_tecnico.nome,
                                    }, {},
                                    (err, html) => {
                                        if (err) {
                                            return res.status(400).send(err);
                                        } else {
                                            pdf.create(html, {}).toFile(

                                                absolutePath2 + '/uploads' +
                                                user_id +
                                                new Date().toLocaleDateString() +
                                                '.pdf',
                                                (err, found) => {
                                                    if (err) {
                                                        res.status(400).send(err);
                                                    } else {

                                                        email(
                                                            'Resultado do teste',
                                                            'O resulta do seu teste é: ' + req.body.resultado,
                                                            user.email
                                                        );
                                                        res.send('Resultado Lançado!');
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );

                    const update_user = await User.updateOne({ numero_utente: user_id }, { Estado: req.body.resultado, Teste_Realizado: true },
                        (err) => {
                            if (err) {
                                res.status(400).send('Não atualizou user!');
                            }
                        }
                    );
                }
            } else {
                const pedido = await Pedido.updateOne({ _id: req.params.idutilizador, status: 'Aceite', resultado: pedido_feito.resultado }, {
                        dataresultado: new Date().toLocaleDateString(),
                        status: 'Terminado',
                        resultado: req.body.resultado,
                    },
                    (err, found) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {

                            ejs.renderFile(
                                absolutePath, {
                                    nome_paciente: user.nome,
                                    numero_utente: user.numero_utente,
                                    morada: user.morada,
                                    telemovel: user.telemovel,
                                    email: user.email,
                                    resultado: req.body.resultado,
                                    nome_tecnico: utilizador_tecnico.nome,
                                }, {},
                                (err, html) => {
                                    if (err) {
                                        return res.status(400).send(err);
                                    } else {
                                        pdf.create(html, {}).toFile(

                                            absolutePath2 + '/uploads' +
                                            user_id +
                                            new Date().toLocaleDateString() +
                                            '.pdf',
                                            (err, found) => {
                                                if (err) {
                                                    res.status(400).send(err);
                                                } else {
                                                    console.log(found);
                                                    email(
                                                        'Resultado do teste',
                                                        'O resulta do seu teste é: ' + req.body.resultado,
                                                        user.email
                                                    );
                                                    res.send('Resultado Lançado!');
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );

                const update_user = await User.updateOne({ numero_utente: user_id }, { Estado: req.body.resultado, Teste_Realizado: true },
                    (err) => {
                        if (err) {
                            res.status(400).send('Não atualizou user!');
                        }
                    }
                );
            }
        } else {
            return res.status(400).send('Não tem pedidos para lançar resultados, volte mais tarde!');
        }
    } else {
        return res.status(400).send('Tem que estar autenticado');
    }
};

const show_pedidos = async(req, res) => {
    const pedido = Pedido.find({ grupo_de_risco: 'SIM' });

    const pedido_normal = Pedido.find({ grupo_de_risco: 'NÃO' });

    res.render('aceitarPedidos', { pedidosUrgentes: pedido, pedidosNormais: pedido_normal });
};

module.exports = {
    eliminarPedido,
    aceitarpedido,
    lancarresultado,
    show_pedidos,
};