export const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);

export const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>
);

export const ExclamationTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-400">
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
);

export const ResultRow = ({ result, isSelected, onToggle, isTestingGlobal }) => {
    const isTestingThis = result.status === 'testing';
    const isComplete = result.status === 'complete';
    const isError = result.status === 'error';
    const StatusIcon = () => {
        if (isTestingThis) return <SpinnerIcon />;
        if (isComplete) return <CheckCircleIcon />;
        if (isError) return <ExclamationTriangleIcon />;
        if (isSelected) return <CheckboxCheckedIcon />;
        return <CheckboxUncheckedIcon />;
    };
    
    const rowBg = isTestingThis ? 'bg-sky-900/50' : 'bg-slate-800/60';
    return (
        <div className={`rounded-xl transition-all duration-300 ${rowBg} hover:bg-slate-700/60 transform hover:scale-[1.02]`}>
            <div className="flex flex-col md:flex-row md:items-center p-3 md:p-4">
                <div className="flex items-center justify-between md:w-1/3 lg:w-2/5 md:pr-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => onToggle(result.name)} disabled={isTestingGlobal} className="flex-shrink-0 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500/50 disabled:cursor-not-allowed transition-transform active:scale-90" >
                                <StatusIcon />
                            </button>
                        <span className="font-semibold text-slate-200 truncate">{result.name}</span>
                    </div>
                </div>
                <div className="mt-3 md:mt-0 grid grid-cols-3 gap-2 md:flex md:w-2/3 lg:w-3/5 md:justify-around">
                    {['ping', 'download', 'upload'].map(statType => {
                        const value = result[statType];
                        const unit = statType === 'ping' ? 'ms' : 'Mbps';
                        const label = statType.charAt(0).toUpperCase() + statType.slice(1);
                            
                        return (
                            <div key={statType} className="p-2 rounded-lg md:p-0 md:w-1/3">
                                <span className="text-xs font-bold tracking-wider text-slate-400 md:hidden">{label}</span>
                                <div className="mt-1 md:mt-0">
                                    <span className={`font-mono text-lg md:text-xl font-bold ${value === 'ERR' || value === 'Disabled' ? 'text-red-400' : 'text-slate-100'}`}>{value}</span>
                                    <span className="text-sm text-slate-400 ml-1">{value !== '--' && value !== 'ERR' && value !== 'Disabled' ? unit : ''}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}



export const SpinnerIcon = () => (
    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

/* Non-Exported */
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-400">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
);

const CheckboxCheckedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-400">
        <path fillRule="evenodd" d="M8.25 12a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V13.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.75 12a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V13.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
);

const CheckboxUncheckedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-500 hover:text-slate-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
