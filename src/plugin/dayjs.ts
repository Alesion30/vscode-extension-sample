import * as dayjs from "dayjs";
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default dayjs;
