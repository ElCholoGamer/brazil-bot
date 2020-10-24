"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../config.json"));
const roleAdd = {
    name: 'roleadd',
    description: 'adds a person to the Brazil role.',
    usage: ['[@Member]'],
    permissions: ['MANAGE_ROLES'],
    execute: ({ message, channel, author, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const member = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        const { brazilRole } = config_json_1.default;
        if (!member) {
            channel.send('You need to mention a member!');
            return;
        }
        const { user: { tag }, } = member;
        if (member.roles.cache.get(brazilRole)) {
            channel.send(`${tag} has the Brazil role!`);
            return;
        }
        try {
            yield member.roles.add(brazilRole);
            yield client.models.UserTickets.upsert({
                user_id: author.id,
                until: Date.now() + 1000 * 60 * 60 * 24,
            });
            channel.send(`Added Brazil role to \`${tag}\`!`);
            yield client.log(`${author.tag} added Brazil role to ${tag}`);
        }
        catch (err) {
            channel.send('An error ocurred while removing the role! This is most likely an issue with permissions.');
        }
    }),
};
exports.default = roleAdd;
