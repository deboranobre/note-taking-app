//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../api/models/noteModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
    //Our parent block
    describe('Notes', () => {
        beforeEach((done) => { //Before each test we empty the database
            Note.remove({}, (err) => { 
                done();         
            });     
    });

    /*
    * Test the /GET route
    */
    describe('/GET note', () => {
        it('it should GET all the notes', (done) => {
            chai.request(server)
                .get('/notes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST note', () => {
        it('it should not POST a note without text field', (done) => {
            let note = {
            }
            chai.request(server)
                .post('/notes')
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('text');
                    res.body.errors.text.should.have.property('kind').eql('required');
                done();
                });
        });
        it('it should POST a note ', (done) => {
                let note = {
                    text: "The Lord of the Rings"
                }
                chai.request(server)
                    .post('/notes')
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('text');
                        done();
                    });
            });

        });

    /*
    * Test the /GET/:_id route
    */
    describe('/GET/:_id note', () => {
        it('it should GET a note by the given id', (done) => {
            let note = new Note({ text: "The Lord of the Rings"});
            note.save((err, note) => {
                chai.request(server)
                    .get('/notes/' + note._id)
                    .send(note)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('text');
                        res.body.should.have.property('_id').eql(note._id.toString());
                    done();
                });
            });

        });
    });

    /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:_id note', () => {
        it('it should UPDATE a note given the id', (done) => {
            let note = new Note({text: "The Chronicles of Narnia"})
            note.save((err, note) => {
                    chai.request(server)
                        .put('/notes/' + note._id)
                        .send({text: "The Chronicles of Narnia 2"})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('text').eql("The Chronicles of Narnia 2");
                        done();
                    });
            });
        });
    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:_id book', () => {
        it('it should DELETE a note given the id', (done) => {
            let note = new Note({text: "The Chronicles of Narnia"})
            note.save((err, note) => {
                    chai.request(server)
                        .delete('/notes/' + note._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Note successfully deleted');
                        done();
                    });
            });
        });
    });

});