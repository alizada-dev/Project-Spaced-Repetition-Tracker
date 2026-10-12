export function calculateDate(topicName, date) {

    const chosenDate = new Date(date);
    const newDate = new Date(chosenDate);
    const newDate1 = new Date(chosenDate);
    const newDate2 = new Date(chosenDate);
    const newDate3 = new Date(chosenDate);
    const newDate4 = new Date(chosenDate);

    const oneWeekLater = newDate.setDate(newDate.getDate() + 7);
    const oneMonthLater = newDate1.setMonth(newDate1.getMonth() + 1);
    const threeMonthsLater = newDate2.setMonth(newDate2.getMonth() + 3);
    const sixMonthsLater = newDate3.setMonth(newDate3.getMonth() + 6);
    const oneYearLater = newDate4.setFullYear(newDate4.getFullYear() + 1);

    const topics = [
        {
            topicName: topicName,
            revisionDate: oneWeekLater,
        },
        {
            topicName: topicName,
            revisionDate: oneMonthLater
        },
        {
            topicName: topicName,
            revisionDate: threeMonthsLater
        },
        {
            topicName: topicName,
            revisionDate: sixMonthsLater
        },
        {
            topicName: topicName,
            revisionDate: oneYearLater
        }
    ]

    return topics;
}