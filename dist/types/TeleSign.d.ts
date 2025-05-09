export default class TeleSign {
    constructor(customerId: any, apiKey: any, restEndpoint?: string, timeout?: number, useragent?: any, source?: string, sdkVersionOrigin?: any, sdkVersionDependency?: any);
    rest: RestClient;
    sms: MessagingClient;
    voice: VoiceClient;
    score: ScoreClient;
    phoneid: PhoneIDClient;
    appverify: AppVerifyClient;
    intelligence: IntelligenceClient;
}
import RestClient from './RestClient';
import MessagingClient from './MessagingClient';
import VoiceClient from './VoiceClient';
import ScoreClient from './ScoreClient';
import PhoneIDClient from './PhoneIDClient';
import AppVerifyClient from './AppVerifyClient';
import IntelligenceClient from './IntelligenceClient';
