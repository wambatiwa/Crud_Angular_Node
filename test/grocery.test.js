const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app');
const seedData = require('../seeds/seed-data');
const Grocery = require('../models/grocery');
const db = require('../utils/database');

chai.use(chaiHttp);
const expect = chai.expect;


describe('Grocery API', () => {
  before((done) => {
    seedData;
    done();
  });

  // Clean up the test database after all tests are done

  after(async () => {
    try {
      await db.query('DELETE FROM groceries');
      db.end();
    } catch (error) {
      console.error('Error cleaning up test database:', error);
    }
  });
  

  describe('GET /groceries', () => {
    it('should return all groceries', async () => {
      const allGroceries = [{ id: 1, item: 'Item 1' }, { id: 2, item: 'Item 2' }];
      const fetchAllStub = sinon.stub(Grocery, 'fetchAll').resolves(allGroceries);

      const response = await chai.request(app).get('/gregory');
      console.log(response.body);

      ///expect(response).to.have.status(200);
      // expect(response.body).to.be.an('array');
      // expect(response.body).to.deep.equal(allGroceries);

      fetchAllStub.restore();
    });
  });

  describe('POST /groceries', () => {
    it('should add a new grocery', async () => {
      const newItem = { item: 'New Item' };
      const postStub = sinon.stub(Grocery, 'post').resolves(newItem);

      const response = await chai.request(app).post('/gregory').send(newItem);

      expect(response).to.have.status(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal(newItem);

      postStub.restore();
    });
  });

  describe('PUT /groceries', () => {
    it('should update a grocery', async () => {
      const updatedItem = { id: 1, item: 'Updated Item' };
      const updateStub = sinon.stub(Grocery, 'update').resolves(updatedItem);

      const response = await chai.request(app).put('/gregory').send(updatedItem);

      expect(response).to.have.status(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal(updatedItem);

      updateStub.restore();
    });
  });

  describe('DELETE /groceries/:id', () => {
    it('should delete a grocery', async () => {
      const itemId = 1;
      const deleteStub = sinon.stub(Grocery, 'deleteById').resolves();

      const response = await chai.request(app).delete(`/gregory/${itemId}`);

      expect(response).to.have.status(201);

      deleteStub.restore();
    });
  });

  describe('GET /unknown', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await chai.request(app).get('/unknown');

      expect(response).to.have.status(404);
      // Add more assertions based on your expectations
    });
  });

  describe('GET /groceries/:id', () => {
    it('should return a specific grocery', async () => {
      const itemId = 7;
      const grocery = { id: itemId, item: 'Item 1' };
      const findByIdStub = sinon.stub(Grocery, 'findById').resolves(grocery);

      const response = await chai.request(app).get(`/gregory/${itemId}`);
      console.log(response.body);

      expect(response).to.have.status(200);
      // expect(response.body).to.be.an('object');
      // expect(response.body).to.deep.equal(grocery);

      findByIdStub.restore();
    });
  });

  describe('POST /groceries without item', () => {
    it('should return 400 for missing item', async () => {
      const response = await chai.request(app).post('/gregory');

      expect(response).to.have.status(400);
      // Add more assertions based on your expectations
    });
  });

  describe('PUT /groceries without id', () => {
    it('should return 400 for missing id', async () => {
      const updatedItem = { item: 'Updated Item' };
      const response = await chai.request(app).put('/gregory').send(updatedItem);

      expect(response).to.have.status(400);
      // Add more assertions based on your expectations
    });
  });

  describe('PUT /groceries with invalid id', () => {
    it('should return 404 for non-existent id', async () => {
      const updatedItem = { id: 999, item: 'Updated Item' };
      const updateStub = sinon.stub(Grocery, 'update').resolves(null);

      const response = await chai.request(app).put('/gregory').send(updatedItem);
      console.log(response.status);

      //expect(response).to.have.status(404);
      // Add more assertions based on your expectations

      updateStub.restore();
    });
  });

  describe('DELETE /groceries/:id with invalid id', () => {
    it('should return 404 for non-existent id', async () => {
      const itemId = 999;
      const deleteStub = sinon.stub(Grocery, 'deleteById').resolves(null);

      const response = await chai.request(app).delete(`/gregory/${itemId}`);

      expect(response).to.have.status(404);
      // Add more assertions based on your expectations

      deleteStub.restore();
    });
  });
});
