'use strict';
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);
describe('Server Test Group', ()=>{
  let id;
  it('Handles bad route', async ()=>{
    const response = await request.get('/foooods');
    expect(response.status).toEqual(404);
  });
  it('Handles bad method', async ()=>{
    const response = await request.post('/food?name=gg');
    expect(response.status).toEqual(404);
  });
  it('Handles creating new food', async () => {
    let foodObj = { name: 'test', price: 55 };
    const response = await request.post('/api/v1/food').send(foodObj);
    id = response.body.id;
    expect(response.body.name).toBe(foodObj.name);
    expect(response.body.price).toBe(foodObj.price);
    expect(response.status).toEqual(200);
  });
  it('Handles reading foods', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.body.foods[0].name).toBe("test");
    expect(response.body.foods[0].price).toBe(55);
    expect(response.body.foods.length).toBe(1);
    expect(response.status).toEqual(200);
  });
  it('Handles updating a record', async ()=>{
    const newObj={
      name:'dd',
      price:55
    }
    const response = await request.put("/api/v1/food/"+id).send(newObj);
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe('dd');
  });
  it('Handles deleting a record', async ()=>{
    const response = await request.delete("/api/v1/food/"+id);
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe('dd');
  });
});