const Sequelize = require('sequelize')
const db = require('../../../sequelize/config/config.json')
const {User} = require('../../../sequelize/models')
const userController = require('../../controllers/user-controller')

const mockResponse = () => {
    res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}

describe("User controller testing", ()=>{
    beforeAll(async()=>{
        mockedSequelize = new Sequelize(db.test);
        await User.bulkCreate([
            {
                id:1,
                name:'qwerrty',
                email:'admin@gmail.com',
                password:'dwdasdwasdwasdw',
                isAdmin:true
            }
        ])
    })
    afterAll(async()=>{
        await User.destroy({truncate:{cascade:true}})
        jest.clearAllMocks();
    })

    describe("Add admin",()=>{
        test("Add admin without an error",async()=>{
            const req = {
                body:{
                    name:'qwerty',
                    email:"admin1@gmail.com",
                    password:'Qwerty123'
                }
            }
            const res = mockResponse()
            await userController.addAdmin(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("Such user already exist", async()=>{
            const req = {
                body:{
                    name:'qwerty',
                    email:"admin@gmail.com",
                    password:'Qwerty123'
                }
            }
            const res = mockResponse()
            await userController.addAdmin(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({error:"Такий користувач вже існує"})
            )
        })

        test("An error occurred while adding", async()=>{
            const req = {
                body:{
                    name:'qwerty',
                    email:"admin@gmail.com",
                }
            }
            const res = mockResponse()
            await userController.addAdmin(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({error:"Відсутні потрібні для реєстрації дані"})
            )
        })
    })

    describe("Show an admin", ()=>{
        test("Show admin without an error", async ()=>{
            const req = {
                params:{ id:1}
            }
            const res = mockResponse()
            await userController.getAdmin(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })
        test("Such user is not exist", async ()=>{
            const req = {
                params:{ id:77}
            }
            const res = mockResponse()
            await userController.getAdmin(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })
        test("An error was occurred while fetching data", async ()=>{
            const req = {
                params:{}
            }
            const res = mockResponse()
            await userController.getAdmin(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Show an admin list", ()=>{

        test("Show admin list without an error", async()=>{
            const req = {
                params: { page: 1 }
            }
            const res = mockResponse()
            await userController.getAdminList(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })
        test("Such data is not exist", async()=>{
            const req = {
                params: { page: 34 }
            }
            const res = mockResponse()
            await userController.getAdminList(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })
        test("An error was occurred while fetching", async()=>{
            const req = {
                params: {}
            }
            const res = mockResponse()
            await userController.getAdminList(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })

    describe("Update an admin", ()=>{
        test("Update an admin without an error", async()=>{
            const req = {
                params: { id: 2},
                body:{
                    password:'Qwerty321',
                    email:'admin2@gmail.com',
                    name:'Bob'
                }
            }
            const res = mockResponse()
            await userController.updateAdmin(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })
        test("If trying to change an email and email is already in use by another user, send an error", async()=>{
            const req = {
                params: { id: 2},
                body:{
                    email:'admin@gmail.com',
                }
            }
            const res = mockResponse()
            await userController.updateAdmin(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({error:"Така пошта вже зайнята"})
            )
        })
        test("An error occurred while fetching", async()=>{
            const req = {}
            const res = mockResponse()
            await userController.updateAdmin(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Delete an admin", ()=>{
        test("Delete an admin without an error", async()=>{
            const req = {
                params:{ id:2 }
            }
            const res = mockResponse()
            await userController.deleteAdmin(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("If trying to delete an main admin, send an error", async()=>{
            const req = {
                params:{ id:1 }
            }
            const res = mockResponse()
            await userController.deleteAdmin(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

        test("An error was occurred while deleting", async()=>{
            const req = {}
            const res = mockResponse()
            await userController.deleteAdmin(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

})