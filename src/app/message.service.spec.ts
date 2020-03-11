import { MessageService } from './message.service';

describe('Message Service', () => {
    let service: MessageService;

    beforeEach(() => {
    });

    it('should have no messages on init', () => {
        service = new MessageService();

        expect(service.messages.length).toBe(0);
    });

    it('should add a message when add() called', () => {

        service = new MessageService();

        service.add('nice one Gary');

        expect(service.messages.length).toBe(1);
    });

    it('should remove all messages when clear() called', () => {
        service = new MessageService();
        service.add('nice one James');

        service.clear();

        expect(service.messages.length).toBe(0);
    });

});
