const GetFormattedDate = () => {
    const now = new Date();
    const { getFullYear, getMonth, getDate, getHours, getMinutes } = now;
    const formattedDate = `${getFullYear}-${(getMonth + 1)
        .toString()
        .padStart(2, "0")}-${getDate.toString().padStart(2, "0")}T${getHours
        .toString()
        .padStart(2, "0")}:${getMinutes.toString().padStart(2, "0")}`;
    return formattedDate;
};

module.exports = { GetFormattedDate };
