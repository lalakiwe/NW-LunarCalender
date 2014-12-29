var beginningYear = -849;  // 850 B.C
var maxyear = 2100;
var lunarstr = '0c0080050010a0070030c0080050010a0070030c0080050020a0070030c0080050020a0070030c0090050020a0070030c0090050020a0060030c0060030c00900600c0c0060c00c00c00c0c000600c0c0006090303030006000c00c060c0006c00000c0c0c0060003030006c00009009c0090c00c009000300030906030030c0c00060c00090c0060600c0030060c00c003006009060030c0060060c0090900c00090c0090c00c006030006060003030c0c00030c0060030c0090060030c0090300c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050000c00900909009009090090090090900900909009009009090090090900900900909009009090090090090900900909009009090090090090900900909009009009090090090900900900909009009090060030c0090050010a0070030b008005001090070040c0080050020a0060030c0090040010a0060030c0090050010a0070030b0080050010a008005001090050020a0060030c0080040010a0060030c0090050010a0070030b0080050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0070030b0080050010a0070040c0080050020a0060030c0080040010a0070030c0090050010a0070030b0080050020a0060030c0080040010a0060030c0090050050020a0060030c0090050010b0070030c0090050010a0070040c0080040020a0060030c0080050020a0060030c0090050010a0070030b0080040020a0060040c0090050020b0070030c00a0050010a0070030b0090050020a0070030c0080040020a0060030c0090050010a0070030c0090050030b007005001090050020a007004001090060020c0070050c0090060030b0080040020a0060030b0080040010a0060030b0080050010a0050040c0080050010a0060030c0080050010b0070030c007005001090070030b0070040020a0060030c0080040020a0070030b0090050010a0060040c0080050020a0060040c0080050010b0070030c007005001090070030c0080050020a0070030c0090050020a0070030c0090050020a0060040c0090050020a0060040c0090050010b0070030c0080050030b007004001090060020c008004002090060020a008004001090050030b0080040020a0060040b0080040c00a0060020b007005001090060030b0070050020a0060020c008004002090070030c008005002090070040c0080040020a0060040b0090050010a0060030b0080050020a0060040c0080050010b00700300108005001090070030c0080050020a007003001090050030a0070030b0090050020a0060040c0090050030b0070040c0090050010c0070040c0080060020b00700400a090060020b007003002090060020a005004001090050030b007004001090050040c0080040c00a0060020c007005001090060030b0070050020a0060020c008004002090060030b008004002090060030b0080040020a0060040b0080040010b0060030b0070050010a00600400207005003080060040030700500307006004003070050030800600400307005004090060040030700500409006005002070050030a0060050030700500400206004002060050030020600400307005004090060040030700500408007005003080050040a00600500307005004002060050030800500400206005002070050040020600500307006004002070050030800600400307005004080060040a006005003080050040020700500409006004002060050030b0060050020700500308006004003070050040800600400307005004080060040020';

/***************************************************************************
 * To identify which is Gregorian or Julian
 * Parms: date (year,mpnth,day). opt=1,2,3 means standard calendar, Gregorge and Julian
 * Return valse: 1(Gregorge), 0(Julian) or -1(non-exist)
 ***************************************************************************/
function getCalendarType(year, month, day, opt) {
	var days_of_month = new Array(0,31,28,31,30,31,30,31,30,30,31,30,31);

	if(opt===1) {
		if(year>1582 || (year===1582 && month>10) || (year===1582 && month===10 && d>14) ) {
			if( (year%400===0) || (year%4===0 && year%100!=0) ) {
				days_of_month[2]++;
			}
			if(month>0 && month<=12 && day>0 && day<=days_of_month[month]) {
				return 1;  //Gregorian
			}
			else {
				return -1;
			}
		}
		else if(year===1582 && month===10 && day>=5 && day<=14) {
			return -1;  /* It is not exist in histroy */
		}
		else {
			if((year%4)===0) {
				days_of_month[2]++;
			}
			if(month>0 && month<=12 && day>0 && day<=days_of_month[month]) {
				return 0;  //Julian
			}
			else {
				return -1;
			}
		}
	}
	else if(opt===2) {
		return 1;
	}
	return 0;
}

/**************************************************************************
 * Return value： the passed days in 'year' year. Or, -1(non-exist).
 **************************************************************************/
function getDateToDays(year, month, day) {
	var days = 0;
	var type = getCalendarType(year, month, day, 1);
	var dm = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);//Days of each month

	if(type!=0){
		if( (year%100!=0 && year%4===0) || (year%400===0) )
			dm[2]+=1;
	}else{
		if(year%4===0)
			dm[2]+=1;
	}
	for(var i=0;i<=month-1;i++){
		days+=dm[i];
	}
	days+=day;
	if(year===1582){
		if(type===1)
			days-=10;
		if(type===-1)
			days=-1;
	}

	return days;
}

/***************************************************************************
 * Return value: the date in 'year' year if passed 'days' days.
 *               ex: if year = 2000, days = 274, it will return 1001
 **************************************************************************/
function getDayToDate(year, days)
{
	var month = 1;
	for(var i=1;i<=12;i++){
		var d = getDateToDays(year,i+1,1)-getDateToDays(year, i, 1);
		if(days<=d || i===12){
			month = i;
			break;
		}else{
			days -= d;
		}
	}
	return Math.ceil( 100*month + days );

}

/***************************************************************************
 * Return value: The standard days compare with the date 1/1/1
 ***************************************************************************/
function getStandardDays(year, month, day)
{
	var days = (year-1)*365 + (year-1)/4 + getDateToDays(year, month, day) - 2;  /* Julian */
	if(year>1582)
		days+= -((year-1)/100) + ((year-1)/400) + 2;  /* Gregorian */
	return days;
}

/***************************************************************************
 * Return Value: the day of week
 ***************************************************************************/
function getDayOfWeek(year, month, day)
{
	return Math.floor( getStandardDays(year, month, day)%7 );
}

/***************************************************************************
 * Parameters: type 0 is PingChi, 1 is DingChi. numSolarTerms 1 is Minor Cold
 * Return Value: the days compare to the solar term
 ***************************************************************************/
function getSolarTerm(year, numSolarTerms, type)
{
	var jd = year * (365.2423112 - 6.4e-14*(year-100)*(year-100) - 3.047e-8*(year-100))
			+ 15.218427 * numSolarTerms + 1721050.71301; /*  Julian  */
	var zeta = 3.0e-4 * year - 0.372781384 - 0.2617913325 * numSolarTerms; /*  angle  */
	var yd = ( 1.945 * Math.sin(zeta) - 0.01206 * Math.sin(2*zeta) ) * ( 1.048994 - 2.583e-5 * year );
	var sd = -18e-4*Math.sin(2.313908653*year-0.439822951-3.0443*numSolarTerms);
	return (type===1)
		? (jd+yd+sd-getStandardDays(year,1,0)-1721425)
		: (jd-getStandardDays(year,1,0)-1721425);
}



/***************************************************************************
 * Utilities
 ***************************************************************************/
function getTail(x) { return x-Math.floor(x); }
function getRem(x,w) { return getTail(x/w)*w; }
function getAngle(x,t,c1,t0,t2,t3) { return getTail(c1*x)*2*Math.PI+t0-t2*t*t-t3*t*t*t; }

/***************************************************************************
 * Return Value: the decimal cycle. ex. 33 -> 3.
 ***************************************************************************/
function getGan(x) { return x%10; }

/***************************************************************************
 * Return Value: the duodecimal cycle. ex. 33 -> 9.
 ***************************************************************************/
function getZhi(x) { return x%12; }

/***************************************************************************
 * Return Value: the number in the decimal/duodecimal cycle
 ***************************************************************************/
function getGanZhi(year, month, day, hour)
{
	// If over Spring Commences
	if ( (getDateToDays(year, month, day) + hour/24.0) < getSolarTerm(year,3,1)-1.0 )
		year -= 1;
	return Math.round( getRem(year-3.0, 60.0) );
}

/***************************************************************************
 * Return Value: the date of lunar
 ***************************************************************************/
function getLunarDate(year, month, day)
{
	var lunar_date = -1;
	var rpi = 180/Math.PI;
	var zone = 8.0;
	var t = (year - 1899.5)/100.0;
	var ms = Math.floor((year-1900)*12.3685);
	var f0 = getAngle(ms,t,0,0.75933,2.172e-4,1.55e-7) +0.53058868*ms-8.37e-4*t+zone/24.0+0.5;
	var fc = 0.1734-3.93e-4*t;
	var j0 = 693595+29*ms;
	var aa0 = getAngle(ms,t,0.08084821133,359.2242/rpi, 0.0000333/rpi,0.00000347/rpi);
	var ab0 = getAngle(ms,t,7.171366127999999e-2,306.0253/rpi, -0.0107306/rpi,-0.00001236/rpi);
	var ac0 = getAngle(ms,t,0.08519585128,21.2964/rpi, 0.0016528/rpi,0.00000239/rpi);

	for(var i=-1;i<=13;i++){
		var aa = aa0+0.507984293*i;
		var ab = ab0+6.73377553*i;
		var ac = ac0+6.818486628*i;
		var f1 = f0+1.53058868*i+fc*Math.sin(aa)-0.4068*Math.sin(ab)+0.0021*Math.sin(2*aa)
			+0.0161*Math.sin(2*ab)+0.0104*Math.sin(2*ac)-0.0074*Math.sin(aa-ab)-0.0051*Math.sin(aa+ab);
		var j = j0+28*i+f1;
		var diff = getStandardDays(year, month, day)-Math.floor(j);
		if( diff>=0 && diff<=29 )
			lunar_date = diff+1;
	}
	return Math.floor(lunar_date);
}

/***************************************************************************
 * Return Value: the leap month. If not exist, return 0.
 ***************************************************************************/
function ctcl_leap_month(year)
{
	var leap = lunarstr.substring(year-beginningYear, year-beginningYear+1);
	//char leap;
	if(leap==='a')
		leap='0'+10;
	if(leap==='b')
		leap='0'+11;
	if(leap==='c')
		leap='0'+12;
	return leap-'0';
}

/***************************************************************************
 * Return Value: return the lunar month. If it is leap month, it will be negative
 ***************************************************************************/
function ctcl_lunar_month(year, month, day)
{
	var lunar_date = getLunarDate(year, month, day);
	var lunar_days = lunar_date - Math.floor(lunar_date/100)*100;
	var leap_num = 0;

	for(var i=beginningYear;i<=year;i++){
		if(ctcl_leap_month(i)!=0)
			leap_num++;
	}

	var non_leap = Math.round((getStandardDays(year, month, day)
		- getStandardDays(beginningYear, 1, 21)
		- lunar_days)/29.530588)-leap_num;

	if(year<=240) non_leap++;
	if(year<=237) non_leap--;
	if(year<24) non_leap++;
	if(year<9) non_leap--;
	if(year<=-255) non_leap++;
	if(year<=-256) non_leap+=2;
	if(year<=-722) non_leap++;


	var lunar_month = Math.round(getRem(non_leap-3.0,12.0)+1.0);
	if(lunar_month===ctcl_leap_month(year-1) && month===1 && day<lunar_days) {
		lunar_month *= -1;
	}
	else if(lunar_month===ctcl_leap_month(year)) {
		lunar_month *= -1;
	}
	else if(lunar_month<ctcl_leap_month(year) || ( month<lunar_month && ctcl_leap_month(year) ) ) {
		lunar_month++;
	}
	else {
		lunar_month = Math.round(getRem(lunar_month - 1, 12) + 1);
	}

	return lunar_month;
}

function CTCalendar() {
}
CTCalendar.prototype = {
	month: 0,
	day: 0,
	gan: 0,
	zhi: 0,
	cmonth: '',
	cday: '',
	ganzhi: '',
	shengxiao: '',
	sterm: '',
	caltype: '',
	weekday: '',
	zodiac: '',
	holiday: '',
	choliday: '',
	yi: '',
	ji: '',
	errorcode: -1
}

/***************************************************************************
 * Return Value: CTC object
 *   error code -1 : invalid date
 *               0 : no data
 *               1 : Success
 ***************************************************************************/
function solarToLunar(year, month, day) {
	var calJson = require('./js/calendar.json');
	var ctc = new CTCalendar();
	var MD = month * 100 + day;

	var yiji = calJson.yiji;
	if(yiji.hasOwnProperty(year.toString())) {
		ctc.yi = yiji[year.toString()][month.toString()][day.toString()]['YI'];
		ctc.ji = yiji[year.toString()][month.toString()][day.toString()]['JI'];
	}

	if (calJson.holiday.hasOwnProperty(MD.toString())) {
		ctc.holiday = calJson.holiday[MD.toString()];
	}

	var type = getCalendarType(year, month, day, 1);
	if (type === -1) {
		ctc.errorcode = -1;
		return ctc;
	}

	ctc.caltype = calJson.caltype[type];

	var weekday = getDayOfWeek(year, month, day);
	ctc.weekday = calJson.weekday[weekday];

	var zodiac = calJson.zodiac;
	for(var i = 0; i < zodiac.length; i++) {		
		if( zodiac[i].start <= MD && MD <= zodiac[i].end ) {
			ctc.zodiac = zodiac[i].name;
			break;
		}
		if( zodiac[i].start > zodiac[i].end ) {
			var MD2 = MD + 1231;
			if( (zodiac[i].start <= MD && MD <= (zodiac[i].end + 1231)) || (zodiac[i].start <= MD2 && MD2 <= (zodiac[i].end + 1231)) ) {
				ctc.zodiac = zodiac[i].name;
				break;
			}
		}
	}

	ctc.gan = getGan(getGanZhi(year, month, day, 12));
	ctc.zhi = getZhi(getGanZhi(year, month, day, 12));
	ctc.ganzhi = calJson.tiangan[ctc.gan] + calJson.dizhi[ctc.zhi];
	ctc.shengxiao = calJson.shengxiao[ctc.zhi];

	for (var i = 0; i < calJson.sterm.length; i++)
	{
		var r = getDayToDate(year, getSolarTerm(year, i + 1, 1));

		if (r >= month * 100 + day)
		{
			ctc.sterm = calJson.sterm[i];
			if(r != month * 100 + day)
			{
				var tempStr = '';
				if( Math.floor(r/10)%10 > 0) {
					tempStr = (Math.floor(r/10)%10).toString();
				}
				if( Math.floor(r%10) > 0) {
					tempStr += Math.floor(r%10).toString();
				}
				if(tempStr.length > 0) {
					ctc.sterm = tempStr + calJson.cwords[0] + ' ' + ctc.sterm;
				}
			}
			break;
		}
		else if(i === (calJson.sterm.length-1))
		{
			ctc.sterm = calJson.sterm[0];
			r = getDayToDate(year + 1, getSolarTerm(year + 1, 1, 1));
		}
	}

	if (year >= maxyear)
	{
		ctc.day = 0;
		ctc.month = 0;
		ctc.cday = "unknown";
		ctc.cmonth = "no data";
		ctc.errorcode = 0;
		return ctc;
	}

	ctc.day = getLunarDate(year, month, day);

	if (ctc.day <= 10)
	{
		ctc.cday = calJson.cnumber[0] + calJson.cnumber[ctc.day];
	}
	else if (ctc.day < 20)
	{
		ctc.cday = calJson.cnumber[10] + calJson.cnumber[ctc.day%10];
	}
	else if (ctc.day === 20)
	{
		ctc.cday = calJson.cnumber[13];
	}
	else if (ctc.day < 30)
	{
		ctc.cday = calJson.cnumber[14] + calJson.cnumber[ctc.day%10];
	}
	else if (ctc.day === 30)
	{
		ctc.cday = calJson.cnumber[15];
	}

	ctc.month = ctcl_lunar_month(year, month, day);
	if (ctc.month === -12)
	{
		ctc.cmonth = calJson.cwords[2] + calJson.cnumber[12] + calJson.cwords[1];
	}
	else if (ctc.month === -11)
	{
		ctc.cmonth = calJson.cwords[2] + calJson.cnumber[11] + calJson.cwords[1];
	}
	else if (ctc.month === -1)
	{
		ctc.cmonth = calJson.cwords[2] + calJson.cnumber[3] + calJson.cwords[1];
	}
	else if (ctc.month < 0)
	{
		ctc.cmonth = calJson.cwords[2] + calJson.cnumber[-ctc.month] + calJson.cwords[1];
	}
	else if (ctc.month === 13)
	{
		ctc.cmonth = calJson.cnumber[3] + calJson.cwords[1];
	}
	else
	{
		ctc.cmonth = calJson.cnumber[ctc.month] + calJson.cwords[1];
	}

	var CMD = 0;
	var tmpMonth = ctc.month;
	if(tmpMonth < 0) tmpMonth = -tmpMonth;
	CMD += tmpMonth * 100;
	CMD += ctc.day;
	if (calJson.choliday.hasOwnProperty(CMD.toString())) {
		ctc.choliday = calJson.choliday[CMD.toString()];
	}

	ctc.errorcode = 1;
	return ctc;
}
