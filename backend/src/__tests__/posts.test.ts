import * as db from "./helpers/db.js"
import {beforeAll, afterEach, afterAll} from "@jest/globals"

beforeAll(() => db.connect());
afterEach(() => db.clearDatabase());
afterAll(() => db.closeDatabase());

