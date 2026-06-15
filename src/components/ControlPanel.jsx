import React from 'react';
import { useTodo } from '../contexts';

function ControlPanel() {
    const {
        todos,
        completeAllTodos,
        deleteAllTodos,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter
    } = useTodo();

    const totalCount = todos.length;
    const activeCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.filter(todo => todo.completed).length;

    return (
        <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-sm mb-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-md">
            {/* Top Row: Search and Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between w-full">
                {/* Search Bar */}
                <div className="relative w-full sm:max-w-xs flex-grow">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-400 text-sm">🔍</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Search todos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white/80 border border-black/10 rounded-xl outline-none transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 text-gray-800 placeholder-gray-400"
                    />
                    {/* searchTerm && ... renders the button only if searchTerm is truthy */}
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Bulk Actions */}
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                        onClick={completeAllTodos}
                        disabled={totalCount === 0 || activeCount === 0}
                        className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl transition-all duration-200 hover:bg-green-100 hover:border-green-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-50 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                        <span>✓</span> Complete All
                    </button>
                    <button
                        onClick={deleteAllTodos}
                        disabled={totalCount === 0}
                        className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl transition-all duration-200 hover:bg-red-100 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-50 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                        <span>🗑</span> Delete All
                    </button>
                </div>
            </div>

            {/* Bottom Row: Filter Tabs */}
            <div className="flex border-t border-black/5 pt-3 justify-center sm:justify-start">
                <div className="flex bg-gray-100/80 p-1 rounded-xl w-full sm:w-auto">
                    {[
                        { id: 'all', label: 'All', count: totalCount },
                        { id: 'active', label: 'Active', count: activeCount },
                        { id: 'completed', label: 'Completed', count: completedCount }
                    ].map((tab) => {
                        const isActive = filter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setFilter(tab.id)}
                                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 flex-1 sm:flex-initial ${
                                    isActive
                                        ? 'bg-white text-green-700 shadow-sm font-semibold'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-white/40'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`px-1.5 py-0.5 text-[10px] rounded-full transition-all duration-300 ${
                                    isActive
                                        ? 'bg-green-100 text-green-700 font-bold'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ControlPanel;
