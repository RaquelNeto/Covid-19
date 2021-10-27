const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Pedidos = require('../models/pedido');
var validateDate = require('validate-date');

const SESSION_EXP = 3600000;

//fazer um registo de um utilizador
const criaruser_paciente = async(req, res) => {
    //if (req.user) {
     //   return res.status(400).send('Tu já tens uma conta!');
   // } else {
        //Verificar a base de dados se existe o email
        const emailExist = await User.findOne({ email: req.body.email });

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

        if (validateDate(req.body.data_de_nascimento)) {
            //Criar um novo user
            const user = new User({
                nome: req.body.nome,
                email: req.body.email.toLowerCase(),
                password: hashedPassword,
                data_de_nascimento: new Date(req.body.data_de_nascimento),
                sexo: req.body.sexo,
                numero_utente: req.body.numero_utente,
                morada: req.body.morada,
                profissao: req.body.profissao,
                telemovel: req.body.telemovel,
                role: 'PACIENTE',
                Estado: "Suspeito"
            });
            try {
                const guardarUser = await user.save();
            } catch (err) {
                return res.status(400).send('Campo invalido!!');
            }
            //Criar e atribuir uma token
            const token = jwt.sign({ _id: user._id, numero_utente: user.numero_utente, role: user.role },
                process.env.TOKEN_SECRET
            );
            res.cookie('session', token, {
                expires: new Date(Date.now() + SESSION_EXP),
                secure: false,
                httpOnly: true,
            });

            const userLogin = { auth:true, _id: user._id, numero_utente: user.numero_utente, role: user.role,token:token }
            

        res
                .header('x-authentication', userLogin)
                .send(userLogin);

                
        } else {
            res.status(400).send('Data invalida!');
        }
   // }
};

//login do utitilizador
const loginuser = async(req, res) => {
  //  if (req.user) {
    //    res.status(400).send('Já tens o login efectuado');
    //} else {
        //Verificar email
        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (user == null) {
            return res.status(400).send('Email ou password não existe');
        }

        //Verificar se a password esta associada ao email
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send('Email ou password não existe');
        } else {
            //Criar e atribuir uma token
            const token = jwt.sign({ _id: user._id, numero_utente: user.numero_utente, role: user.role },
                process.env.TOKEN_SECRET
            );
            res.cookie('session', token, {
                expires: new Date(Date.now() + SESSION_EXP),
                secure: false,
                httpOnly: true,
            });

            const userLogin = { auth:true, _id: user._id, numero_utente: user.numero_utente, role: user.role,token:token }
            

        res
                .header('x-authentication', userLogin)
                .send(userLogin);

        

        
        }
   // }
};

const me = (req, res) => {
    //if (req.user) {
        res.json(req.user)
   // } else {
     //   res.status(401)
      //  res.json(null)
    //}
}



//logout da aplicação
const logout = (req, res) => {
  //  if (!req.user) {
    //    return res.json('Não estás autentificado!');
   // } else {
        res.clearCookie('session');
        res.json({ success: 'true' });
  //  }
};

const logout_page = (req, res) => {
  //  if (!req.user) {
  //      return res.json('Não estás autentificado!');
  //  } else {
        res.clearCookie('session')
        res.json({ success: 'true' })
        res.render('logout');
   // }
};



//ver perfil do paciente por parte do tecnico ou do administrador
const verperfil_paciente = async(req, res) => {
  //  if (!req.user) {
  //      res.status(400).send('Tem que se encontrar autenticado!');
   // } else {
        const user_ = await User.find({ numero_utente: req.params.id }, function(err, found) {
            if (err) {
                return res.status(400).send('Não existe o user na bd');
            } else {
                return res.send(found);
            }
        });
   // }
};

//ver perfil do utilizador
const verperfil = async(req, res) => {
    // if (!req.user) {
    // res.status(400).send('Tem que se encontrar autenticado!');
    //  } else {
    const user = await User.find({ numero_utente: req.user.numero_utente }, function(err, found) {
        if (err) {
            return res.status(400).send('Não existe o user na bd');
        } else {
            //res.render('meusDados', { user: found });

        }
    });
    res.json(user);
  //}
};

//update password,email,morada, numero de telemovel, profissao, atualizar nos pedidos
const update_dados = async(req, res) => {
   // if (req.user) {
        const user = await User.findOne({ numero_utente: req.user.numero_utente });
        
        if (req.body.passwordold != null && req.body.passwordnew != null) {
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

                

                if (hashedPassword) {
                    const user_ = await User.updateOne({ numero_utente: req.user.numero_utente }, {
                            email: req.body.email.toLowerCase() || user.email,
                            morada: req.body.morada || user.morada,
                            telemovel: req.body.telemovel || user.telemovel,
                            profissao: req.body.profissao || user.profissao,
                            password: hashedPassword,
                        },
                        (err) => {
                            if (err) {
                                return res.status(400).send(err);
                            }
                        }
                    );

                    const pedido = Pedidos.updateMany({ numero_utente: req.user.numero_utente }, {
                            email: user.email,
                            morada: user.morada,
                            telemovel: user.telemovel,
                            profissao: user.profissao,
                        },
                        (err) => {
                            if (err) {
                                return res.status(400).send(err);
                            } else {
                                return res.send('Atualizado com sucesso!');
                            }
                        }
                    );
                } else {
                    return res.status(400).send('A password fornecida é diferente da nova!');
                }
            } else {
                return res.status(400).send('Password invalida ou igual a anterior!');
            }
        } else {
            const user_ = await User.updateOne({ numero_utente: req.user.numero_utente }, {
                    email: req.body.email.toLowerCase() || user.email,
                    morada: req.body.morada || user.morada,
                    telemovel: req.body.telemovel || user.telemovel,
                    profissao: req.body.profissao || user.profissao,
                },
                (err) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                }
            );

            const pedido = Pedidos.updateMany({ numero_utente: req.user.numero_utente }, { email: user.email, morada: user.morada, telemovel: user.telemovel, profissao: user.profissao },
                (err) => {
                    if (err) {
                        return res.status(400).send(err);
                    } else {
                        return res.send('Atualizado com sucesso!');
                    }
                }
            );
        }
   // } else {
    //    return res.status(400).send('Tem que se encontrar autenticado!');
   // }
};



const utilizadores = async(req, res) => {
    const user = User.find({}, (err, found) => {
        if (err) {
            res.status(400).send("Algo deu errado!");
        }
        res.json(found);
    })
}

const utilizadoresnumero= async (req,res) =>{
     const user = User.find({numero_utente:req.body.numero_utente}, (err, found) => {
        if (err) {
            res.status(400).send("Algo deu errado!");
        }
        res.json(found);
    })
}

module.exports = {
    criaruser_paciente,
    loginuser,
    logout,
    verperfil,
    verperfil_paciente,
    update_dados,
    logout_page,
    utilizadores,
    me,
    utilizadoresnumero
};