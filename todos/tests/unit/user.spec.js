import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import userStore from "../../src/store/User";
const Vue = createLocalVue();
Vue.use(Vuex);

function getTestState() {
    const localState = {
        people: {},
        profileType: undefined,
        relationships: [],
        roles: [],
        communicationTypes: [],
        employers: {}
    } as PersonModuleState;

    return localState;
}

describe("Person actions", () => {
    it("person can be saved with correct data", async () => {
        const mockFn = jest.fn(({ personId, personDto }) => {
            return {
                data: {
                    id: personId,
                    person: personDto
                }
            };
        });


        const testStore = personStore("");
        const commit = jest.fn();

        const testResult = await testStore.actions.login(
            { commit},
            {username:"username", password:"password"}
        );

        const expectResult = {
           
        };
        expect(commit).toHaveBeenCalledWith("setUser", {
            people: [expectResult]
        });
    });
});
