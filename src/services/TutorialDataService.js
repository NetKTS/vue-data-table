import http from "../http-common";
class TutorialDataService {
    getAll() {
        return http.get("/tutorial");
    }
    findByTitle(title) {
        return http.get(`/tutorial/title/${title}`);
    }
    DeleteById(itemId) {
        return http.delete(`/tutorial/${itemId}`);
    }
    update(ItemId,data){
        return http.put(`/tutorial/${ItemId}`,data)
    }
    get(ItemId){
        return http.get(`/tutorial/${ItemId}`);
    }
    create(data){
        return http.post("/tutorial", data);
    }
}
export default new TutorialDataService();