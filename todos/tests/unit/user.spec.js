import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import UserStore from "../../src/store/User";
const Vue = createLocalVue();
Vue.use(Vuex);


describe("Person actions", () => {
    it("person can be saved with correct data", async () => {
        const userService = {
            loginAsync:
                jest.fn().mockReturnValue({
                    data: {
                        id: "1", username: "user1"
                    }
                })
        };
        const userStore = UserStore(userService);
  
        
        const commit = jest.fn();

        const testResult = await userStore.actions.login(
            { commit},
            {username:"username", password:"password"}
        );

        const expectResult = {
            id: "1", username: "user1"
        };
        expect(commit).toHaveBeenCalledWith("setUser", 
            expectResult
        );
    });
});
