import { commonAxios } from "../../utils/axios";
import { validatorService } from "../validator-services";

// Функція відправлення даних з форми зворотнього зв'язку до серверу
export const callBackService = {

    async sendData (data, formName) {
        try {
            if(validatorService.validateCallBackForm(formName)) {
                const response = await commonAxios.post('/callback/add', {...data})
                if(response.status === 200){
                    return true
                }
                throw new Error(response.data.error)
            }
        } catch (e) {
            return e.message
        }
    }
}