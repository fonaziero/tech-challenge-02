
type HistoryProps = {
    month: string;
    date: string;
    type: string;
    value: string;
};

const History = ({date, month, type, value}: HistoryProps) => {
    return (
        <div className="flex flex-col gap-3 border-b border-green">
        <span className="text-xs font-semibold text-green">{month}</span>
        <div className="flex justify-between flex-wrap">
          <span className="text-sm">{type}</span>
          <span className="text-xs text-cardDateGray">{date}</span>
        </div>
        <span className="text-sm font-semibold mb-3">{value}</span>
      </div>
    );
};

export default History;