const Pedidos = require('../models/pedido');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var validateDate = require('validate-date');


//criar um utilizador por parte do administrador
const criaruser_admin = async(req, res) => {

    //Verificar a base de dados se existe o email
    const emailExist = await User.findOne({ email: req.body.email.toLowerCase() });
    if (emailExist != null) {
        return res.status(400).send('Email já existe');
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = null;
    var regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    if (regex.test(req.body.password) === true) {
        hashedPassword = await bcrypt.hash(req.body.password, salt);
    } else {
        return res
            .status(400)
            .send(
                'A password tem que cumprir os seguntes requisitos: \n Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula!'
            );
    }

    //formato da data 2020/12/12

    if (validateDate(req.body.data_de_nascimento)) {
        //Criar um novo user
        const user = new User({
            nome: req.body.nome,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            data_de_nascimento: req.body.data_de_nascimento,
            sexo: req.body.sexo,
            numero_utente: req.body.numero_utente,
            morada: req.body.morada,
            profissao: req.body.profissao,
            telemovel: req.body.telemovel,
            role: req.body.role || 'TECNICO', //pode dizer a role ou senão assume que é técnico
            Estado: "Não Infetado"
        });
        try {
            const guardarUser = await user.save();
            return res.send({ user: user.nome });
        } catch (err) {
            return res.status(400).send('Campo invalido!');
        }
    } else {
        return res.status(400).send('Isso não é uma data!');
    }

};


//get
const numero_testes_realizados = async(req, res) => {
    const pedidos = await Pedidos.find({ status: 'Terminado' });

    return res.send(pedidos.length);

}

//get
const numero_de_testes_realizados_por_pessoa = async(req, res) => {
        const pedidos = await Pedidos.aggregate([{
                "$group": {
                    "_id": "$user",
                    "count": { "$sum": 1 }
                }
            },
            {
                "$match": {
                    "numero_utente": "$numero_utente",
                    "status": "Terminado"
                }

            }

        ]);
        res.send(pedidos);

    }
    //get
const numero_de_pessoas_naoinfetadas = async(req, res) => {
    const user = await User.find({ Estado: "Não Infetado" });
    res.json(user.length);

}

//get
const numero_de_pessoas_suspeitas = async(req, res) => {
    const user = await User.find({ Estado: "Suspeito" });
    res.json(user.length);

}



//get
const numero_de_pessoas_infetadas = async(req, res) => {
    const user = await User.find({ Estado: "Infetado" });
    res.json(user.length);

}

//get
const numero_de_pessoas_infetados_femininos = async(req, res) => {
    const user_feminino = await User.find({ Estado: "Infetado", sexo: "Feminino" });






    res.send(user_feminino.length);


}

//get
const numero_de_pessoas_infetados_masculinos = async(req, res) => {

    const user_masculino = await User.find({ Estado: "Infetado", sexo: "Masculino" });





    res.send(user_masculino.length);


}



//deleted
//eliminar contas
const eliminar_utilizador = async(req, res) => {

    const utilizador = await User.findOne({ _id: req.params.idutilizador });
    const administrador = await User.find({ role: 'ADMIN' });

    if (utilizador.role === 'ADMIN' && administrador.length === 1 && utilizador.numero_utente != req.user.numero_utente) {
        return res.status(400).send('Já só exite um administrador, não pode eliminar a conta ou não pode eliminar a propria conta!');
    } else {
        const eliminar = User.deleteOne({ _id: req.params.idutilizador }, (err) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.send('Eliminado com sucesso!');
            }
        });
    }

};

//put
const editar_pass = async(req, res) => {

    const validPass = await bcrypt.compare(req.body.passwordold, user.password);
    const validPass_old_new = await bcrypt.compare(req.body.passwordnew, user.password);
    if (validPass && !validPass_old_new) {
        //Hash passwords
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = null;
        var regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

        if (regex.test(req.body.passwordnew) === true) {
            hashedPassword = await bcrypt.hash(req.body.passwordnew, salt);
        } else {
            return res
                .status(400)
                .send(
                    'A password tem que cumprir os seguntes requisitos: \n Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula!'
                );
        }

        const user_ = await User.updateOne({ numero_utente: req.params.idutilizador }, {
                password: hashedPassword,
            },
            (err) => {
                if (err) {
                    return res.status(400).send(err);
                }
            }
        );


    } else {
        return res.status(400).send('Password invalida ou igual a anterior!');
    }

}

//put
const editar_uitlizador = async(req, res) => {


    const user_Paciente = await User.findOne({ _id: req.params.idutilizador });


    const user_ = await User.updateOne({ numero_utente: req.params.idutilizador }, {
            email: req.body.email.toLowerCase() || user_Paciente.email,
            morada: req.body.morada || user_Paciente.morada,
            telemovel: req.body.telemovel || user_Paciente.telemovel,
            profissao: req.body.profissao || user_Paciente.profissao,
            role: req.body.role || user_Paciente.role,
            data_de_nascimento: req.body.data_de_nascimento || user_Paciente.data_de_nascimento,
        },
        (err) => {
            if (err) {
                return res.status(400).send(err);
            }
        }
    );
    const pedido = Pedidos.updateMany({ _id: req.params.idutilizador }, { email: user_Paciente.email, morada: user_Paciente.morada, telemovel: user_Paciente.telemovel, profissao: user_Paciente.profissao },
        (err) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.send('Atualizado com sucesso!');
            }
        }
    );
    return res.send('Dados atualizados com sucesso!');


};

const show_utilizador = async(req, res) => {
    User.find({}, (err, founduser) => {
        if (!err) {
            res.render('User', { utilizador: founduser });
        } else {
            res.send('Não existem utilizadores!');
        }
    });
};

const show_unique_user = async(req, res) => {
    User.findOne({ _id: req.params.idutilizador }, (err, found) => {
        res.render('meusDados', { user: found });
    });
};

module.exports = {
    criaruser_admin,
    eliminar_utilizador,
    editar_uitlizador,
    show_utilizador,
    show_unique_user,
    editar_pass,
    numero_de_testes_realizados_por_pessoa,
    numero_testes_realizados,
    numero_de_pessoas_infetadas,
    numero_de_pessoas_infetados_femininos,
    numero_de_pessoas_infetados_masculinos,
    numero_de_pessoas_suspeitas,
    numero_de_pessoas_naoinfetadas
};